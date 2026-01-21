import express from "express";
import { getProgressForActiveBook, updateProgressForActiveBook } from "../controllers/progressController";

const progressRouter = express.Router();

progressRouter.get('/active-book-progress', getProgressForActiveBook);
progressRouter.put('/active-book-progress', updateProgressForActiveBook)

export default progressRouter;