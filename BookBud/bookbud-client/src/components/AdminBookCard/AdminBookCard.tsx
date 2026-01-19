import './AdminBookCard.scss';
import { Book } from '../../models/book';
import { Pencil, Trash2 } from 'lucide-react';

interface AdminBookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export const AdminBookCard = ({ book, onEdit, onDelete }: AdminBookCardProps) => {
  return (
    <div className="admin-book-card">
      <div className="column-a">
        <img
          src={book.coverUrl || '/images/default-book-cover.png'}
          alt={book.title}
        />
      </div>

      <div className="column-b">
        <h3>{book.title}</h3>
        <span>by {book.author}</span>
        <span>{book.pageCount} pages</span>
        <span>{book.year}</span>
        <span className={`status ${book.isActive ? 'active' : 'inactive'}`}>
          {book.isActive ? 'In progress' : 'Finished'}
        </span>

        <div className="actions">
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(book)}>
              <Pencil /> Edit
            </button>
          )}
          {onDelete && (
            <button className="delete-btn" onClick={() => onDelete(book)}>
              <Trash2 /> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};