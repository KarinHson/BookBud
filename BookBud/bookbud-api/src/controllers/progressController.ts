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

export const updateProgressForActiveBook = async (req: Request, res: Response) => {
  try {
    const { pagesRead, userId } = req.body;

    if (typeof pagesRead !== 'number' || !userId) {
      return res.status(400).json({ message: 'Missing pagesRead or userId' });
    }

    const activeBook = await Book.findOne({ isActive: true });
    if (!activeBook) {
      return res.status(404).json({ message: 'No active book found' });
    }

    // make sure pages read can't be less than 0 or more than the total amount of pages  
    const clampedPagesRead = Math.min(Math.max(pagesRead, 0), activeBook.pageCount);

    //find progress for this user
    let userProgress = await Progress.findOne({
      bookId: activeBook._id,
      userId,
    });

    if (!userProgress) {
      // if no progress exists, create new document
      userProgress = new Progress({
        bookId: activeBook._id,
        userId,
        pagesRead: clampedPagesRead,
        isFinished: clampedPagesRead === activeBook.pageCount,
      });
    } else {
      // update existing progress
      userProgress.pagesRead = clampedPagesRead;
      userProgress.isFinished = clampedPagesRead === activeBook.pageCount;
    }

    await userProgress.save();

    res.json({ pagesRead: userProgress.pagesRead });
  } catch (error) {
    console.error('updateProgressForActiveBook error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};