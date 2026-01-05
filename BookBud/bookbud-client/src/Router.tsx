import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { ActiveBook } from './pages/ActiveBook/ActiveBook';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { FinishedBooks } from './pages/FinishedBooks/FinishedBooks';
import { Login } from './pages/Login/Login';
import { MembersProgress } from './pages/MembersProgress/MembersProgress';
import { Error } from './pages/Error';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/',
                element: <Login/>
            },
            {
                path: '/active-book',
                element: <ActiveBook/>
            },
            {
                path: '/finished-books',
                element: <FinishedBooks/>
            },
            {
                path: '/admin-panel',
                element: <AdminPanel/>
            },
            {
                path: '/members-progress',
                element: <MembersProgress/>
            },
            
        ]
    }
]);