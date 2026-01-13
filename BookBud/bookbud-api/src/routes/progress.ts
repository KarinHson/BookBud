import express from "express";
import { getProgressForActiveBook } from "../controllers/progressController";

const progressRouter = express.Router();

progressRouter.get('/active-book-progress', getProgressForActiveBook);

export default progressRouter;