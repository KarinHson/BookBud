import './AdminActiveBookCard.scss';
import type { Book } from '../../models/book';
import { BookCoverPlaceholder } from '../BookCoverPlaceholder/BookCoverPlaceholder';

interface AdminActiveBookCardProps {
    book: Book
    onMarkAsFinished: (book: Book) => void
}

export const AdminActiveBookCard = ( { book, onMarkAsFinished }: AdminActiveBookCardProps) => {
    return (
        <div className="admin-active-book-card">
            {book.coverUrl
            ? <img src={book.coverUrl} alt={book.title} />
            : <BookCoverPlaceholder />}
            <div className='book-info'>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>{book.pageCount} pages</p>
                <p>Published {book.year}</p>
                {onMarkAsFinished && (
                    <button 
                        className="mark-finished-btn"
                        onClick={() => onMarkAsFinished(book)}
                    >
                    Mark as Finished
                    </button>
                )}
            </div>
        </div>
    )
}