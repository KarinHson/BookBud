import { booksService } from '../services/booksService';
import type { Book } from '../models/book';

export const checkIfActiveBookExists = async (): Promise<boolean> => {
  try {
    const activeBook = await booksService.getActiveBook();
    return true; // true if a book is already active
  } catch (err) {
    return false;
  }
};