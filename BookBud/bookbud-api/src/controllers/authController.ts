import { Request, Response } from "express";
import { User } from "../models/User";

export const login = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            _id: user._id,
            userName: user.userName,
            isAdmin: user.isAdmin
        });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}