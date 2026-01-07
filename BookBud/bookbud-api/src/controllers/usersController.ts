import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { password: 0 }); //don't include password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
