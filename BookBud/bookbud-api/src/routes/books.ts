import express from 'express';
import { getAllBooks, getActiveBook, getInactiveBooks, createBook, updateBook } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/active', getActiveBook);
booksRouter.get('/inactive', getInactiveBooks);
booksRouter.post('/', createBook);
booksRouter.put('/:id', updateBook);

export default booksRouter;
