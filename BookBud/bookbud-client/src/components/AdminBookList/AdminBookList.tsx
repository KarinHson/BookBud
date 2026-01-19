import './AdminBookList.scss';
import type { Book } from '../../models/book';
import { AdminBookCard } from '../AdminBookCard/AdminBookCard';

interface AdminBookListProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export const AdminBookList = ({ books, onEdit, onDelete }: AdminBookListProps) => {
  if (books.length === 0) {
    return <p>No books found</p>;
  }

  return (
    <div className="admin-book-list">
      {books.map((book) => (
        <AdminBookCard
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};