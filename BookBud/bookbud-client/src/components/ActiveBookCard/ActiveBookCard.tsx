import './ActiveBookCard.scss';
import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { booksService } from '../../services/booksService';
import { progressService } from '../../services/progressService';
import { authService } from '../../services/authService';
import { calcProgressPercent } from '../../helpers/calcProgressPercent';

export const ActiveBookCard = () => {

  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [pagesRead, setPagesRead] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeBook = await booksService.getActiveBook();
        setActiveBook(activeBook);
  
        const progressData = await progressService.getProgressForActiveBook();
  
        //find the logged in users progress for the active book
        const user = authService.getCurrentUser();
        const userId = user?.id;
        const usersProgress = progressData.members.find((member) => member.userId === userId);
        setPagesRead(usersProgress?.pagesRead ?? 0);
      } catch (error) {
      console.error('Error fetching active book or progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading active book...</p>;
  }

  if (!activeBook) {
    return <p>No active book found</p>;
  }


  const totalPages = activeBook.pageCount;
  const progressPercent = calcProgressPercent(pagesRead, totalPages)

  return (
    <div className="book-card">
      <div className="column-a">
        <img
          src={activeBook.coverUrl || '/images/default-book-cover.png'} //TODO: add fallback img
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
