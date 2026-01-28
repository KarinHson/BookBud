import './ActiveBookCard.scss';
import { useEffect, useState } from 'react';
import { Book } from '../../models/book';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { booksService } from '../../services/booksService';
import { progressService } from '../../services/progressService';
import { authService } from '../../services/authService';
import { calcProgressPercent } from '../../helpers/calcProgressPercent';
import { BookCoverPlaceholder } from '../BookCoverPlaceholder/BookCoverPlaceholder';

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
    return <p>Loading current book...</p>;
  }

  if (!activeBook) {
    return <p>No current book found</p>;
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
        {activeBook.coverUrl
          ? <img src={activeBook.coverUrl} alt={activeBook.title} />
          : <BookCoverPlaceholder />}
      </div>

      <div className="column-b">
        <h2>{activeBook.title}</h2>
        <span>by {activeBook.author}</span>
        <div className="pages-year">
          <span className="chip">{activeBook.pageCount} pages</span>
          <span className="chip">Published {activeBook.year}</span>
        </div>
        {activeBook.meetingInfo && (
          <span>Meeting info: {activeBook.meetingInfo}</span>
        )}
        <div className='progress-update'>
          <ProgressBar percent={progressPercent} totalPages={totalPages} pagesRead={pagesRead}/>
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
