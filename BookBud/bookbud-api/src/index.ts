import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import booksRouter from './routes/books';

const app = express();

dotenv.config(); // reads the .env file

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

  const PORT = process.env.PORT || 5000;

  app.use('/api/books', booksRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


