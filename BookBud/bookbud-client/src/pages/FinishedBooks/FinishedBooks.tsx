import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { InactiveBookCard } from '../../components/InactiveBookCard/InactiveBookCard';

export const FinishedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInactiveBooks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/books/inactive');
        if (!res.ok) throw new Error('Failed to fetch books');
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInactiveBooks();
  }, []);

  if (isLoading) return <p>Loading finished books...</p>;
  if (books.length === 0) return <p>No finished books yet</p>;

  return (
    <div className="finished-books-page">
      {books.map((book) => (
        <InactiveBookCard key={book._id} book={book} />
      ))}
    </div>
  );
};
