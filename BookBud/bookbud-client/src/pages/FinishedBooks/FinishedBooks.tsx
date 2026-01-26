import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { InactiveBookCard } from '../../components/InactiveBookCard/InactiveBookCard';
import { booksService } from '../../services/booksService';
import './FinishedBooks.scss'

export const FinishedBooks = () => {
  const [inactiveBooks, setInactiveBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    booksService.getInactiveBooks()
    .then(setInactiveBooks)
    .catch(err => console.error('Error fetching inactive books:', err))
    .finally(() => setIsLoading(false))
  }, []);

  if (isLoading) return <p>Loading finished books...</p>;
  if (inactiveBooks.length === 0) return <p>No finished books yet</p>;

  return (
  <div className="finished-books-container">
      <h1>Finished Books</h1>
      <p>Your book club&apos;s reading history</p>

    {inactiveBooks.length > 0 ? (
      <div className="books-grid">
        {inactiveBooks.map((inactiveBook) => (
          <InactiveBookCard key={inactiveBook._id} book={inactiveBook} />
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <p>No finished books yet</p>
      </div>
    )}
  </div>
);
};
