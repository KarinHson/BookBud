import './AdminPanel.scss';
import { useState, useEffect, useRef } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import type { Book } from '../../models/book';
import { booksService } from '../../services/booksService';
import { AdminActiveBookCard } from '../../components/AdminActiveBookCard/AdminActiveBookCard';
import { AdminBookList } from '../../components/AdminBookList/AdminBookList';
import { BookForm } from '../../components/BookForm/BookForm';

interface AdminPanelProps {
  activeBook?: Book | null;
}

export const AdminPanel = ({ activeBook }: AdminPanelProps) => {
  const [showForm, setShowForm] = useState(false);
  const [activeBookExists, setActiveBookExists] = useState(false);

  const [activeBookState, setActiveBookState] = useState<Book | null>(null);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const editFormRef = useRef<HTMLDivElement>(null);


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

//makes the site scroll up to the Edit form when Edit is pressed on a book
useEffect(() => {
  if (editingBook && editFormRef.current) {
    editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [editingBook]);

const handleSubmit = async (bookData: Omit<Book, '_id'>) => {
  try {
    const createdBook = await booksService.createBook(bookData);

    setAllBooks(prev => [...prev, createdBook]);

    // clear state
    setShowForm(false);

    if (createdBook.isActive) {
      setActiveBookState(createdBook);
      setActiveBookExists(true);
    }
  } catch (error: any) {
    console.error('Failed to create book:', error.message);
    alert(error.message);
  }
};

const handleMarkAsFinished = async (book: Book) => {
  const confirmed = window.confirm(`Are you sure you want to mark "${book.title}" as finished? This will move the book to Finished Books`);
  if (!confirmed) return; // the user pressed cancel

  try {
    const updatedBook = await booksService.updateBook(book._id, { isActive: false });

    setAllBooks(prev => prev.map(b => (b._id === updatedBook._id ? updatedBook : b)));

    setActiveBookState(null);
    setActiveBookExists(false);
  } catch (err) {
    console.error('Failed to mark book as finished', err);
  }
}

const handleDeleteBook = async (book: Book) => {
  const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"? This cannot be undone.`);
  if (!confirmed) return;

  try {
    await booksService.deleteBook(book._id);
    setAllBooks(allBooks.filter(b => b._id !== book._id));

    //if the deleted book was the active book, remove it from the top section
      if (activeBookState?._id === book._id) {
      setActiveBookState(null);
      setActiveBookExists(false);
    }
  } catch (err) {
    console.error('Failed to delete book:', err);
    alert('Could not delete the book. Check console for details.');
  }
};

const handleUpdateBook = async (updatedBookData: Omit<Book, '_id'>) => {
  if (!editingBook) return;

  try {
    const updatedBook = await booksService.updateBook(editingBook._id, updatedBookData);

    // uppdate the book in all books
    setAllBooks(prev => prev.map(b => (b._id === updatedBook._id ? updatedBook : b)));

    //if the updated book was active, update activeBookState
    if (updatedBook.isActive) {
      setActiveBookState(updatedBook);
      setActiveBookExists(true);
    } else if (editingBook.isActive && !updatedBook.isActive) {
      setActiveBookState(null);
      setActiveBookExists(false);
    }

    // close the edit form 
    setEditingBook(null);
  } catch (err) {
    console.error('Failed to update book', err);
    alert('Could not update the book. Check console for details.');
  }
};

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage your book club</p>
      </header>

      <section className="current-book">
        <h2>Current Book</h2>

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
        <button 
          className="add-book-btn" 
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}>
            <Plus className="icon" />
            Add new book
        </button>
      )}

      {showForm && (
        <section className="add-book-form">
            <BookForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            activeBookExists={activeBookExists}
            activeBookId={activeBookState?._id}
            />
        </section>
      )}
      {editingBook && (
        <section className="edit-book-form" ref={editFormRef}>
          <BookForm
          book={editingBook}
          onSubmit={handleUpdateBook}
          onCancel={() => setEditingBook(null)}
          activeBookExists={activeBookExists}
          activeBookId={activeBookState?._id}
          />
        </section>
      )}
      <section className="all-books">
        <h2 id="all-books-heading">All Books</h2>
        <AdminBookList
          books={allBooks}
          onEdit={(book) => {
              setShowForm(false); // close New Book form
              setEditingBook(book); // open Edit form
          }}
          onDelete={handleDeleteBook}
        />
      </section>
    </div>
  );
};
