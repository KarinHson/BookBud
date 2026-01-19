import { Book } from "../models/book";

const API_BASE = import.meta.env.VITE_API_BASE + '/books'

export const booksService = {
  getActiveBook: async (): Promise<Book | null> => {
    const response = await fetch(`${API_BASE}/active`);
    if (!response.ok) {
      throw new Error('Failed to fetch active book');
    }
    return response.json();
  },

  getInactiveBooks: async (): Promise<Book[]> => {
    const response = await fetch(`${API_BASE}/inactive`);
    if (!response.ok) {
      throw new Error('Failed to fetch finished books');
    }
    return response.json();
  },

  getAllBooks: async (): Promise<Book[]> => {
    const response = await fetch(`${API_BASE}`);
    if (!response.ok) {
      throw new Error('Failed to fetch all books');
    }
    return response.json();
  },

  createBook: async (bookData: {
     title: string;
    author: string;
    pageCount: number;
    year: number;
    coverUrl?: string;
    meetingInfo?: string;
    isActive?: boolean;
  }): Promise<Book> => {
    const response = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
        if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create book');
    }

    return response.json();
  },

  updateBook: async (id: string, updateData: Partial<Book>): Promise<Book> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update book');
  }

  return response.json();
},
};