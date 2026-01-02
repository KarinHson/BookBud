import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends Document {
    userName: string;
    password: string;
    isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  });

  export const User = mongoose.model<IUser>('User', UserSchema);