import './InactiveBookCard.scss';
import { Book } from '../../models/book';
import { BookCoverPlaceholder } from '../BookCoverPlaceholder/BookCoverPlaceholder';

interface InactiveBookCardProps {
  book: Book;
}

export const InactiveBookCard = ({ book }: InactiveBookCardProps) => {
  return (
    <div className="inactive-book-card">
      {/* Book Cover */}
      {book.coverUrl
        ? <img src={book.coverUrl} alt={book.title} />
        : <BookCoverPlaceholder />}

      {/* Book Info */}
      <div className="info">
        <h3>{book.title}</h3>
        <span>by {book.author}</span>
        <span>{book.pageCount} pages</span>
        <span>{book.year}</span>
      </div>
    </div>
  );
};