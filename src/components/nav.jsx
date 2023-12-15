import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export default function NavBar() {
  const [authSession, setAuthSession] = useLocalStorage('sb-danhdzqsjdgwuhsndizl-auth-token', null);

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setAuthSession(null);
    window.location.reload();

    if (error) console.error(error);
  }

  return (
    <div className='navbar bg-base-100 px-8'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/chat'>Chat</Link>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link className='btn btn-ghost text-xl' to='/'>
          Home
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/chat'>Chat</Link>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        {authSession ? (
          <button className='btn btn-error' onClick={handleSignOut}>
            Logout
          </button>
        ) : (
          <div className='flex gap-5'>
            <Link className='btn' to='/signUp'>
              Sign Up
            </Link>
            <Link className='btn' to='/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
