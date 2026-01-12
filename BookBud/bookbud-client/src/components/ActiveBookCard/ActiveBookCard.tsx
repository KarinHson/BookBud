import './ActiveBookCard.scss';
import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { booksService } from '../../services/booksService';

export const ActiveBookCard = () => {

  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    booksService.getActiveBook()
    .then(setActiveBook)
    .catch(err => console.error('Error fetching active book:', err))
    .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading active book...</p>;
  }

  if (!activeBook) {
    return <p>No active book found</p>;
  }


  const totalPages = activeBook.pageCount;
  const pagesRead = 75; //mock for now
  const progressPercent = Math.floor((pagesRead / totalPages) * 100);

  return (
    <div className="book-card">
      <div className="column-a">
        <img
          src={activeBook.coverUrl}
          alt={activeBook.title}
        />
      </div>

      <div className="column-b">
        <h1>{activeBook.title}</h1>
        <span>by {activeBook.author}</span>
        <span>{activeBook.pageCount} pages</span>
        <span>{activeBook.year}</span>
        <ProgressBar percent={progressPercent} totalPages={totalPages} pagesRead={pagesRead}/>
      </div>
    </div>
  );
};
