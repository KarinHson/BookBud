import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  pagesRead: number;
  isFinished: boolean;
}

const ProgressSchema = new Schema(
    {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        },
    pagesRead: {
        type: Number,
        required: true,
        default: 0,
        },
    isFinished: {
        type: Boolean,
        default: false,
        },
    },
    {
    timestamps: true,
    }
)

export const Progress = mongoose.model<IProgress>('Progress', ProgressSchema);