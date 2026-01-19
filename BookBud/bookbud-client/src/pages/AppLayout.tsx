import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { useAuth } from '../context/AuthContext';

export const AppLayout = () => {
  const { isAuthenticated, user } = useAuth();

  const showHeader = isAuthenticated;
  const isAdmin = user ? user.isAdmin : false;

  return (
    <> 
       {showHeader && <Header isAdmin={isAdmin} />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
