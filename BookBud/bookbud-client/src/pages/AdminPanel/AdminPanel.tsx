import './AdminPanel.scss';
import { useState, useEffect } from 'react';
import { Plus, Upload, BookOpen, Info } from 'lucide-react';
import type { Book } from '../../models/book';
import { checkIfActiveBookExists } from '../../helpers/bookHelpers';
import { booksService } from '../../services/booksService';
import { AdminActiveBookCard } from '../../components/AdminActiveBookCard/AdminActiveBookCard';
import { AdminBookList } from '../../components/AdminBookList/AdminBookList';

interface AdminPanelProps {
  activeBook?: Book | null;
}

export const AdminPanel = ({ activeBook }: AdminPanelProps) => {
  const [showForm, setShowForm] = useState(false);
  const [activeBookExists, setActiveBookExists] = useState(false);

  const [activeBookState, setActiveBookState] = useState<Book | null>(null);
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pageCount, setPageCount] = useState<number | ''>('');
  const [year, setYear] = useState<number | ''>('');
  const [coverUrl, setCoverUrl] = useState('');
  const [meetingInfo, setMeetingInfo] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const books = await booksService.getAllBooks();
      setAllBooks(books);
    } catch (err) {
      console.error('Error fetching all books:', err);
    }
  };

  fetchBooks();
}, []);

  useEffect(() => {
    const fetchActiveBook = async () => {
      try {
        const active = await booksService.getActiveBook();
        setActiveBookState(active);
        setActiveBookExists(!!active) //true if active book exists
      } catch (err) {
        console.error('Error fetching active book:', err);
        setActiveBookState(null);
        setActiveBookExists(false);
      }
    };

    fetchActiveBook();
}, []);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const newBook = {
    title,
    author,
    pageCount: Number(pageCount),
    year: Number(year),
    coverUrl,
    meetingInfo,
    isActive
  };
  try {
    const createdBook = await booksService.createBook(newBook);

    //clear the form 
    setTitle('');
    setAuthor('');
    setPageCount('');
    setYear('');
    setCoverUrl('');
    setMeetingInfo('');
    setIsActive(false);
    setShowForm(false);

    //if the newly created book is set to isActive: true, update activeBookExists
    if (createdBook.isActive) {
      setActiveBookExists(true);
    }
  } catch (error: any) {
    console.error('Failed to create book:', error.message);
    alert(error.message);
  }
}

const handleMarkAsFinished = async (book: Book) => {
  const confirmed = window.confirm(`Are you sure you want to mark "${book.title}" as finished? This will move the book to Finished Books`);
  if (!confirmed) return; // the user pressed cancel
  try {
    await booksService.updateBook(book._id, { isActive: false });
    setActiveBookState(null);
    setActiveBookExists(false);
  } catch (err) {
    console.error('Failed to mark book as finished', err);
  }
}

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage your book club&apos;s reading</p>
      </header>

      <section className="current-book">
        <h2>Current Active Book</h2>

        {activeBookState ? (
         <AdminActiveBookCard book={activeBookState} onMarkAsFinished={(book) => handleMarkAsFinished(book)}/>
        ) : (
          <div className="no-book">
            <BookOpen className="icon" />
            <p>No active book yet. Add one below!</p>
          </div>
        )}
      </section>

      {!showForm && (
        <button className="add-book-btn" onClick={() => setShowForm(true)}>
          <Plus className="icon" />
          Add New Active Book
        </button>
      )}

      {showForm && (
        <section className="add-book-form">
          <h2>Add New Book</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input id="title" type="text" placeholder="Enter book title" value={title} 
              onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input id="author" type="text" placeholder="Enter author name" value={author}
              onChange={(e) => setAuthor(e.target.value)} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pages">Number of Pages *</label>
                <input id="pages" type="number" min={1} value={pageCount}
                onChange={(e) => {
                  const value = e.target.value;
                  setPageCount(value === '' ? '' : Number(value))
                }} />
              </div>

              <div className="form-group">
                <label htmlFor="year">Publication Year *</label>
                <input id="year" type="number" placeholder="2020" min={0} value={year}
                onChange={(e) => {
                  const value = e.target.value;
                  setYear(value === '' ? '' : Number(value));
                }}/>
              </div>
            </div>

            <div className="form-group cover-input">
              <label htmlFor="coverImage">Book Cover Image URL *</label>
              <Upload className="icon" />
              <input id="coverImage" type="url" value={coverUrl} placeholder="https://example.com/book-cover.jpg"
              onChange={(e) => setCoverUrl(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="meetingInfo">Meeting Info, optional</label>
                <input id="meetingInfo" type="text" value={meetingInfo}
                onChange={(e) => setMeetingInfo(e.target.value)}
                />
            </div>

            <div className="form-group checkbox-group">
              <input id="isActive" type="checkbox" disabled={activeBookExists} checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}/>
              <label htmlFor="isActive">Current book</label>
              {activeBookExists && (
                <p className='info-text'>Another book is already set as current book. Only one book can be active at a time.</p>
              )}
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="save-btn">Save Book</button>
            </div>
          </form>
        </section>
      )}
      <section className="all-books">
        <h2>All Books</h2>
        <AdminBookList
          books={allBooks}
          onEdit={(book) => console.log('Edit', book)}
          onDelete={(book) => console.log('Delete', book)}
        />
      </section>
    </div>
  );
};
