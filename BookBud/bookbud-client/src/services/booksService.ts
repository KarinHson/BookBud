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
  }
};