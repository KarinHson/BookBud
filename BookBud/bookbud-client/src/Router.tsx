import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { ActiveBook } from './pages/ActiveBook/ActiveBook';
import { AdminPage } from './pages/AdminPage/AdminPage';
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
                path: '/admin-page',
                element: <AdminPage/>
            },
            {
                path: '/members-progress',
                element: <MembersProgress/>
            },
            
        ]
    }
]);