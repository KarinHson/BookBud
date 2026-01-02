import express from 'express';
import { getAllBooks, getActiveBook, getInactiveBooks } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/active', getActiveBook);
booksRouter.get('/inactive', getInactiveBooks);

export default booksRouter;
