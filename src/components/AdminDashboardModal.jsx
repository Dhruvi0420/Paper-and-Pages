import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, RotateCcw, BookOpen } from 'lucide-react';

export default function AdminDashboardModal({
  isOpen,
  onClose,
  books,
  onOpenNewBook,
  onEditBook,
  onDeleteBook,
  onResetDefaultBooks,
  categories,
  darkMode
}) {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const bg = darkMode ? 'bg-[#181326]' : 'bg-white';
  const border = darkMode ? 'border-brand-700/50' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const subtext = darkMode ? 'text-brand-300' : 'text-brand-600';

  const filteredBooks = books.filter((b) => {
    const matchesCat = filterCategory === 'All' || b.category === filterCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        className={`relative ${bg} rounded-3xl max-w-4xl w-full shadow-2xl border ${border} overflow-hidden my-6 max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b ${border} flex items-center justify-between ${
            darkMode ? 'bg-brand-950/50' : 'bg-brand-50/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                darkMode ? 'bg-brand-800 text-brand-200' : 'bg-brand-600 text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-base sm:text-lg font-bold ${text}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Admin Book Management
              </h2>
              <p className={`text-xs ${subtext}`}>
                MongoDB: <strong>paper_and_pages</strong> • {books.length} books in catalog
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              darkMode ? 'hover:bg-brand-800 text-brand-300' : 'hover:bg-brand-100 text-brand-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Action Bar */}
        <div
          className={`p-3 border-b ${border} flex flex-wrap items-center justify-between gap-3 text-xs ${
            darkMode ? 'bg-brand-950/40' : 'bg-white'
          }`}
        >
          <input
            type="text"
            placeholder="Search book or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 min-w-[180px] max-w-xs text-xs px-3 py-1.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-brand-500 ${
              darkMode
                ? 'bg-brand-900/60 border-brand-700 text-white placeholder-brand-500'
                : 'bg-brand-50/50 border-brand-200 text-brand-900 placeholder-brand-400'
            }`}
          />

          <div className="flex items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-xl border cursor-pointer ${
                darkMode
                  ? 'bg-brand-900 border-brand-700 text-white'
                  : 'bg-white border-brand-200 text-brand-900'
              }`}
            >
              <option value="All">All Categories</option>
              {categories
                .filter((c) => c !== 'All Books')
                .map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>

            <button
              onClick={() => {
                if (window.confirm('Restore original bookstore collection?')) {
                  onResetDefaultBooks();
                }
              }}
              className={`p-1.5 border rounded-xl transition-colors cursor-pointer ${
                darkMode
                  ? 'border-brand-700 text-brand-400 hover:bg-brand-800'
                  : 'border-brand-200 text-brand-600 hover:bg-brand-50'
              }`}
              title="Reset default books"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenNewBook}
              className="px-3 py-1.5 text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-xl flex items-center gap-1 shadow-sm cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Book</span>
            </button>
          </div>
        </div>

        {/* Books List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredBooks.length === 0 ? (
            <div className={`text-center py-10 text-xs ${subtext}`}>
              No books found matching your search.
            </div>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                  darkMode
                    ? 'border-brand-800/40 bg-brand-950/30 hover:bg-brand-900/30'
                    : 'border-brand-100 bg-white hover:bg-brand-50/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-10 h-14 object-cover rounded-lg flex-shrink-0 bg-brand-100"
                  />
                  <div className="min-w-0">
                    <h4 className={`text-xs font-bold truncate ${text}`} title={book.title}>
                      {book.title}
                    </h4>
                    <p className={`text-[11px] truncate ${subtext}`}>
                      Written by — {book.author}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          darkMode ? 'bg-brand-900 text-brand-300' : 'bg-brand-100 text-brand-700'
                        }`}
                      >
                        {book.category}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          darkMode ? 'text-brand-200' : 'text-brand-700'
                        }`}
                      >
                        ₹{book.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => onEditBook(book)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      darkMode
                        ? 'hover:bg-brand-800 text-brand-300'
                        : 'hover:bg-brand-100 text-brand-700'
                    }`}
                    title="Edit book"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteBook(book.id)}
                    className="p-2 rounded-xl text-pink-400 hover:text-pink-500 hover:bg-pink-500/10 transition-colors cursor-pointer"
                    title="Delete book"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
