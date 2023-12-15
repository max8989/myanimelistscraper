import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export default function useGetToken(tokenName) {
  const [authSession, setAuthSession] = useLocalStorage('supabaseUser', '');
  return useEffect(() => {
    const checkForToken = () => {
      const token = localStorage.getItem(tokenName);
      console.log(token);
      if (token) {
        setAuthSession(token);
        clearInterval(intervalId); // Clear the interval once we have the token
      }
    };

    // Check for token every second for 5 seconds
    const intervalId = setInterval(checkForToken, 1000);

    // Set a timeout to clear the interval after 5 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);

    // Clear interval and timeout on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);
}
