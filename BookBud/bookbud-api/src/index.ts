import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import booksRouter from './routes/books';
import cors from 'cors'; 
import authRouter from './routes/auth';
import progressRouter from './routes/progress';

dotenv.config(); // reads the .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/progress', progressRouter)

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error('MONGODB_URL is missing in .env');
}

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

  app.use('/api/books', booksRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});