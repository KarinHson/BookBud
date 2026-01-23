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
        ? <img src={book.coverUrl} alt={book.title} className="cover"/>
        : <BookCoverPlaceholder />}

      {/* Book Info */}
      <div className="info">
        <h3>{book.title}</h3>
        <span>by {book.author}</span>
        <div className="pages-year">
          <span className="chip">{book.pageCount} pages</span>
          <span className="chip">Published {book.year}</span>
        </div>
      </div>
    </div>
  );
};