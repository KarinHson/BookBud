import express from 'express';
import { getAllBooks, getActiveBook, getInactiveBooks, createBook, updateBook, deleteBook } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/active', getActiveBook);
booksRouter.get('/inactive', getInactiveBooks);
booksRouter.post('/', createBook);
booksRouter.put('/:id', updateBook);
booksRouter.delete('/:id', deleteBook)

export default booksRouter;
