import { User } from "../models/user";
import { Book } from "../models/book";

interface MembersProgress {
    userId: string;
    name: string;
    pagesRead: number;
    isFinished: boolean;
}

interface ProgressForActiveBook {
    book: Book;
    members: MembersProgress[];
}

const API_BASE = import.meta.env.VITE_API_BASE + '/progress';

const getProgressForActiveBook = async (): Promise<ProgressForActiveBook> => {
    const response = await fetch(`${API_BASE}/active-book-progress`);

    if (!response.ok) {
        throw new Error('Failed to fetch progress for active book');
    }

    return response.json();
}

const updateProgressForActiveBook = async (pagesRead: number, userId: string) => {
    const response = await fetch(`${API_BASE}/active-book-progress`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        pagesRead,
        userId
})
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update progress');
    }

    return response.json();
}

export const progressService = {
    getProgressForActiveBook,
    updateProgressForActiveBook
};