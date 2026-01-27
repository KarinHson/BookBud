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
            <div className="cover">
                {book.coverUrl
                ? <img src={book.coverUrl} alt={`${book.title} book cover image`} />
                : <BookCoverPlaceholder />}
            </div>
            <div className='book-info'>
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <div className="pages-year">
                    <p className="chip">{book.pageCount} pages</p>
                    <p className="chip">Published {book.year}</p>
                </div>
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