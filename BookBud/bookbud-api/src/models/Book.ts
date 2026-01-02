import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IBook extends Document {
    title: string;
    author: string;
    year: number;
    pageCount: number;
    coverUrl?: string;
    meetingInfo?: string;
    isActive: boolean;
}

const BookSchema = new Schema<IBook>( {
    title: {
        type: String,
        required: true,
        trim: true,
    },

    author: {
        type: String,
        required: true,
        trim: true,
    },

    year: {
        type: Number,
        required: true,
        min: 0,
    },

    pageCount: {
        type: Number,
        required: true,
        min: 1,
    },

    coverUrl: {
        type: String,
        default: '',
    },

    meetingInfo: {
        type: String,
        default: '',
    },

    isActive: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  });

  export const Book = mongoose.model<IBook>('Book', BookSchema);