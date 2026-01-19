import type { ReactElement } from 'react';
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactElement;
  adminOnly?: boolean;
}

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, user } = useAuth();

    
    if (isLoading) {

        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to='/' replace />
    }

    if (adminOnly && !user?.isAdmin) {
    return <Navigate to='/active-book' replace />; // if the user is not an admin, redirect to active-book
}

    return children
}