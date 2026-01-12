import { createBrowserRouter } from 'react-router';
import { AppLayout } from './pages/AppLayout';
import { ActiveBook } from './pages/ActiveBook/ActiveBook';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { FinishedBooks } from './pages/FinishedBooks/FinishedBooks';
import { Login } from './pages/Login/Login';
import { MembersProgress } from './pages/MembersProgress/MembersProgress';
import { Error } from './pages/Error';
import { PublicLayout } from './pages/PublicLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

export const router = createBrowserRouter([
     {
    element: <PublicLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
   },
    { 
        element: <AppLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path: '/active-book',
                element: (
                    <ProtectedRoute>
                        <ActiveBook/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/finished-books',
                element: (
                    <ProtectedRoute>
                        <FinishedBooks/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/admin-panel',
                element: (
                    <ProtectedRoute adminOnly>
                        <AdminPanel/>
                    </ProtectedRoute>
                )
            },
            {
                path: '/members-progress',
                element: (
                    <ProtectedRoute>
                        <MembersProgress/>
                    </ProtectedRoute>
                )
            },
        ]    
    }
]);