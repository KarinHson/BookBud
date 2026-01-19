import { User } from "../models/user";

const API_BASE = import.meta.env.VITE_API_BASE + '/users';

const getAllUsers = async (): Promise<User[]> => {
    const response = await fetch(API_BASE);

    if(!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

const getUserById = async (id: string): Promise<User> => {
    const response = await fetch(`${API_BASE}/${id}`);

    if(!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
}

export const usersService = {
    getAllUsers,
    getUserById
}