import NavBar from './nav';

export function Layout({ children }) {
  return (
    <div className='h-screen w-full'>
      <div className=''>
        <NavBar />
      </div>
      {children}
    </div>
  );
}
