import { Request, Response } from 'express';
import { Book } from '../models/Book';
import { Progress } from '../models/Progress';

export const getProgressForActiveBook = async (req: Request, res: Response) => {
  try {
    const activeBook = await Book.findOne({ isActive: true }).lean();
    if (!activeBook) return res.status(404).json({ message: 'No active book found' });

    const bookObjectId = activeBook._id;
    const bookIdString = bookObjectId.toString();

    const progressEntries = await Progress.find({ bookId: bookObjectId })
      .populate('userId', 'userName')
      .lean();

    const members = progressEntries.map((entry: any) => {
      const user = entry.userId;
      return {
        userId: user?._id?.toString() ?? entry.userId.toString(),
        name: user?.userName ?? 'Unknown',
        pagesRead: entry.pagesRead,
        isFinished: entry.isFinished,
      };
    });

    res.json({
      book: {
        _id: bookObjectId,
        title: activeBook.title,
        pageCount: activeBook.pageCount,
      },
      members,
    });
  } catch (error) {
    console.error('getProgressForActiveBook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
