import Home from './home';
import NavBar from './nav';

export function Layout({ children }) {
  return (
    <div className='h-screen w-full'>
      <div className='mx-10'>
        <NavBar />
      </div>
      <Home />
      {children}
    </div>
  );
}
