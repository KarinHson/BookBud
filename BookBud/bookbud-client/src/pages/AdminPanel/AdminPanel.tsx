import './AdminPanel.scss';
import { useState } from 'react';
import { Plus, Upload, BookOpen } from 'lucide-react';
import type { Book } from '../../models/book';

interface AdminPanelProps {
  activeBook?: Book | null;
}

export const AdminPanel = ({ activeBook }: AdminPanelProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage your book club&apos;s reading</p>
      </header>

      <section className="current-book">
        <h2>Current Active Book</h2>

        {activeBook ? (
          <div className="book-details">
            <img src={activeBook.coverUrl} alt={activeBook.title} />
            <div className="book-info">
              <h3>{activeBook.title}</h3>
              <p>by {activeBook.author}</p>
              <p>{activeBook.pageCount} pages</p>
              <p>Published: {activeBook.year}</p>
              <p>Status: {activeBook.isActive ? '✓ Finished' : '📖 In Progress'}</p>
            </div>
          </div>
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

          <form className="form">
            <div className="form-group">
              <label htmlFor="title">Book Title *</label>
              <input id="title" type="text" placeholder="Enter book title" />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input id="author" type="text" placeholder="Enter author name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pages">Number of Pages *</label>
                <input id="pages" type="number" placeholder="304" />
              </div>

              <div className="form-group">
                <label htmlFor="year">Publication Year *</label>
                <input id="year" type="number" placeholder="2020" />
              </div>
            </div>

            <div className="form-group cover-input">
              <label htmlFor="coverImage">Book Cover Image URL *</label>
              <Upload className="icon" />
              <input id="coverImage" type="url" placeholder="https://example.com/book-cover.jpg" />
            </div>

            <div className="form-group checkbox-group">
              <input id="isFinished" type="checkbox" />
              <label htmlFor="isFinished">Mark as Finished</label>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="save-btn">Save Book</button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};
