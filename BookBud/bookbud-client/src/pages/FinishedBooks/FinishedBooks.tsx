import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { InactiveBookCard } from '../../components/InactiveBookCard/InactiveBookCard';
import { booksService } from '../../services/booksService';

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
    <div className="finished-books-page">
      {inactiveBooks.map((inactiveBook) => (
        <InactiveBookCard key={inactiveBook._id} book={inactiveBook} />
      ))}
    </div>
  );
};
