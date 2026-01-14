import { Request, Response } from 'express';
import { Book } from '../models/Book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getActiveBook = async (req: Request, res: Response) => {
  try {
    const activeBook = await Book.findOne({ isActive: true });
    if (!activeBook) return res.status(404).json({ message: 'No active book found' });
    res.json(activeBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInactiveBooks = async (req: Request, res: Response) => {
    try {
        const inactiveBooks = await Book.find({ isActive: false });
        if (!inactiveBooks) return res.status(404).json({ message: 'No inactive books found' });
        res.json(inactiveBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' })
    }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, pageCount, year, coverUrl, meetingInfo, isActive } = req.body;

    if (!title || !author || !pageCount || !year || !coverUrl) {
      return res.status(400).json({ message: 'Missing required fields '});
    }

    
      const newBook = new Book({
        title,
        author,
        pageCount,
        year,
        coverUrl: coverUrl || '',
        meetingInfo: meetingInfo || '',
        isActive: !!isActive,
      });
    
      await newBook.save();
      res.status(201).json(newBook);
  } catch (error) {
     console.error('Error creating book:', error);
    res.status(500).json({ message: 'Server error' });
  }

}
