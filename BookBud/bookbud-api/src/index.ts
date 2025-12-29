import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config(); // 👈 LÄSER .env-filen

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error('MONGODB_URL is missing in .env');
}

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });


//connect to DB
// mongoose.connect(process.env.MONGODB_URL || '');