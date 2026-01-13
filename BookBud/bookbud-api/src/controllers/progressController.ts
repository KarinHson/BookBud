import { Request, Response } from 'express';
import { Book } from '../models/Book';
import { Progress } from '../models/Progress';

export const getProgressForActiveBook = async (req: Request, res: Response) => {
  try {
    const activeBook = await Book.findOne({ isActive: true });
    if (!activeBook) {
      return res.status(404).json({ message: 'No active book found' });
    }

    const progress = await Progress.find({ bookId: activeBook._id })
      .populate('userId', 'userName');

    const members = progress.map((entry) => ({
      userId: entry.userId._id,
      name: (entry.userId as any).userName,
      pagesRead: entry.pagesRead,
      isFinished: entry.isFinished,
    }));

    res.json({
      book: {
        _id: activeBook._id,
        title: activeBook.title,
        pageCount: activeBook.pageCount,
      },
      members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
