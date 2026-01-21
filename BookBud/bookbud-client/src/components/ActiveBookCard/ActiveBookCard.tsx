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
  const [inputPagesRead, setInputPagesRead] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');


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

  useEffect(() => {
    setInputPagesRead(pagesRead);
  }, [pagesRead]);

  if (isLoading) {
    return <p>Loading active book...</p>;
  }

  if (!activeBook) {
    return <p>No active book found</p>;
  }

  const handleUpdateProgress = async () => {
    if (!activeBook) return;

    //makes sure the pages read cannot be less than 0 or more than the total amount of pages of the active book
    const clampedValue = Math.min(
    Math.max(inputPagesRead, 0),
    activeBook.pageCount
    );

    const user = authService.getCurrentUser();

    try {
      setIsSaving(true);
      setError('');

      const updated = await progressService.updateProgressForActiveBook(clampedValue, user!.id);

      setPagesRead(updated.pagesRead);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

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
        {activeBook.meetingInfo && (
          <span>Meeting info: {activeBook.meetingInfo}</span>
        )}
        <ProgressBar percent={progressPercent} totalPages={totalPages} pagesRead={pagesRead}/>
        <div className='progress-update'>
          <label htmlFor="pagesRead">Log your reading progress</label>
          <div className='progress-update-row'>
            <input 
            type="number" 
            id="pagesRead"
            min={0}
            max={activeBook.pageCount}
            value={inputPagesRead}
            onChange={(e) => setInputPagesRead(Number(e.target.value) || 0)}
            />
            <button
            onClick={handleUpdateProgress}
            disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Update'}
            </button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>
  );
};
