import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import type { Book } from '../../models/book';

interface BookFormProps {
  book?: Book;
  onSubmit: (bookData: Omit<Book, '_id'>) => void;
  onCancel: () => void;
  activeBookExists: boolean;
}

export const BookForm = ({ book, onSubmit, onCancel, activeBookExists }: BookFormProps) => {
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [pageCount, setPageCount] = useState<number | ''>(book?.pageCount || '');
  const [year, setYear] = useState<number | ''>(book?.year || '');
  const [coverUrl, setCoverUrl] = useState(book?.coverUrl || '');
  const [meetingInfo, setMeetingInfo] = useState(book?.meetingInfo || '');
  const [isActive, setIsActive] = useState(book?.isActive || false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title,
      author,
      pageCount: Number(pageCount),
      year: Number(year),
      coverUrl,
      meetingInfo,
      isActive,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Book Title *</label>
        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input id="author" type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pages">Number of Pages *</label>
          <input id="pages" type="number" min={1} value={pageCount}
            onChange={e => setPageCount(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label htmlFor="year">Publication Year *</label>
          <input id="year" type="number" min={0} value={year}
            onChange={e => setYear(e.target.value === '' ? '' : Number(e.target.value))} />
        </div>
      </div>

      <div className="form-group cover-input">
        <label htmlFor="coverImage">Book Cover Image URL</label>
        <Upload className="icon" />
        <input id="coverImage" type="url" value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="meetingInfo">Meeting Info, optional</label>
        <input id="meetingInfo" type="text" value={meetingInfo} onChange={e => setMeetingInfo(e.target.value)} />
      </div>

      <div className="form-group checkbox-group">
        <input id="isActive" type="checkbox" disabled={activeBookExists} checked={isActive}
          onChange={e => setIsActive(e.target.checked)} />
        <label htmlFor="isActive">Current book</label>
        {activeBookExists && (
          <p className="info-text">Another book is already set as current book. Only one book can be in progress at a time.</p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="save-btn">Save Book</button>
      </div>
    </form>
  );
};