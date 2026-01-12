import { User } from "../models/user";

const API_BASE = import.meta.env.VITE_API_BASE + '/auth';

const login = async (userName: string, password: string): Promise<User> => {

    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
    });

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

    const user: User = {
        ...data,
        id: data._id
    };

    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = (): User | null => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null; 
};

export const authService = {
    login,
    logout,
    getCurrentUser
};