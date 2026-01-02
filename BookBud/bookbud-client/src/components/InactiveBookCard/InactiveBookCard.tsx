import './InactiveBookCard.scss';
import { Book } from '../../models/book';

interface InactiveBookCardProps {
  book: Book;
}

export const InactiveBookCard = ({ book }: InactiveBookCardProps) => {
  return (
    <div className="inactive-book-card">
      {/* Book Cover */}
      <img
        className="cover"
        src={book.coverUrl}
        alt={book.title}
      />

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