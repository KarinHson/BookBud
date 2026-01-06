import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';

export const AppLayout = () => {
  const isAdmin = true; // add later based on who is logged in

  return (
    <>
      <Header isAdmin={isAdmin} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
