import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_BOOKS } from './data/initialBooks';
import { CATEGORIES } from './data/categories';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookCard from './components/BookCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import AdminBookFormModal from './components/AdminBookFormModal';
import AboutModal from './components/AboutModal';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ArrowUpDown, Search } from 'lucide-react';

export default function App() {
  // -------------------------------------------------------------
  // Theme State (Dark / Light Mode - Opposite Inverted Colors)
  // -------------------------------------------------------------
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('paper_and_pages_theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('paper_and_pages_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('paper_and_pages_theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // -------------------------------------------------------------
  // Persistent States (Books, Cart, Wishlist, Admin)
  // -------------------------------------------------------------
  // Books state is loaded from MongoDB backend (not stored in localStorage)
  const [books, setBooks] = useState(INITIAL_BOOKS);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('paper_and_pages_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('paper_and_pages_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('paper_and_pages_isAdmin') === 'true';
    } catch {
      return false;
    }
  });

  // Clear any legacy localStorage books cache
  useEffect(() => {
    try {
      localStorage.removeItem('paper_and_pages_books_v2');
      localStorage.removeItem('paper_and_pages_books');
    } catch {}
  }, []);

  // Load books from MongoDB on initial mount
  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        if (data?.books && data.books.length > 0) {
          setBooks(data.books);
        }
      })
      .catch((err) => {
        console.log('MongoDB books fetch note:', err.message);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('paper_and_pages_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('paper_and_pages_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('paper_and_pages_isAdmin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // -------------------------------------------------------------
  // Filter & Search
  // -------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default | price-asc | price-desc

  // -------------------------------------------------------------
  // Modals State
  // -------------------------------------------------------------
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // -------------------------------------------------------------
  // Actions
  // -------------------------------------------------------------
  const handleAddToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    showToast(`Added to Cart`, `${book.title} (₹${book.price})`, 'cart');
  };

  const handleUpdateQuantity = (bookId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === bookId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId));
    showToast(`Item removed from cart`);
  };

  const handleToggleWishlist = (book) => {
    const exists = wishlist.some((b) => b.id === book.id);
    if (exists) {
      setWishlist((prev) => prev.filter((b) => b.id !== book.id));
      showToast('Removed from Wishlist', book.title);
    } else {
      setWishlist((prev) => [...prev, book]);
      showToast('Saved to Wishlist', book.title, 'wishlist');
    }
  };

  const handleSaveBook = (bookData) => {
    // 1. Update local state
    setBooks((prev) => {
      const index = prev.findIndex((b) => b.id === bookData.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = bookData;
        return updated;
      }
      return [bookData, ...prev];
    });

    // 2. Sync with MongoDB
    const isEdit = Boolean(bookToEdit);
    const url = isEdit ? `/api/books/${bookData.id}` : '/api/books';
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    }).catch((err) => console.log('MongoDB save note:', err.message));

    showToast(
      isEdit ? 'Book Updated (MongoDB)' : 'Book Added (MongoDB)',
      `${bookData.title} - ₹${bookData.price}`
    );
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Do you want to delete this book?')) {
      const book = books.find((b) => b.id === bookId);
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      setCart((prev) => prev.filter((item) => item.id !== bookId));
      setWishlist((prev) => prev.filter((item) => item.id !== bookId));

      // Sync deletion with MongoDB
      fetch(`/api/books/${bookId}`, { method: 'DELETE' }).catch((err) =>
        console.log('MongoDB delete note:', err.message)
      );

      showToast('Book deleted from MongoDB', book?.title || '');
    }
  };

  const handleResetDefaultBooks = () => {
    fetch('/api/books/reset', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.books) {
          setBooks(data.books);
        } else {
          setBooks(INITIAL_BOOKS);
        }
      })
      .catch(() => {
        setBooks(INITIAL_BOOKS);
      });

    showToast('Default book collection restored in MongoDB');
  };

  const handleStartCheckout = (data) => {
    setCheckoutData(data);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderData) => {
    // Save order into MongoDB
    if (orderData) {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).catch((err) => console.log('MongoDB order note:', err.message));
    }

    setCart([]);
    showToast('Order Placed Successfully!', `Order ${orderData?.id || ''} saved to MongoDB`);
  };

  const scrollToBooks = () => {
    document.getElementById('books-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & Sorted
  const displayedBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesCategory =
          selectedCategory === "All Books" || book.category === selectedCategory;
        const matchesQuery =
          searchQuery.trim() === "" ||
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [books, selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#0f0c18] text-[#ede8f5]' : 'bg-[#fffdfa] text-brand-900'
    }`}>
      
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAdmin={() => (isAdmin ? setAdminDashboardOpen(true) : setAdminLoginOpen(true))}
        isAdmin={isAdmin}
        onLogoutAdmin={() => {
          setIsAdmin(false);
          showToast('Logged out of Admin mode');
        }}
        onOpenNewBook={() => {
          setBookToEdit(null);
          setBookFormOpen(true);
        }}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onScrollToBooks={scrollToBooks}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Banner */}
      <Hero onExploreClick={scrollToBooks} darkMode={darkMode} />

      {/* Main Books Catalog Section */}
      <main id="books-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Section Heading & Sorting */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
          darkMode ? 'border-brand-800/40' : 'border-brand-100'
        }`}>
          <div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-brand-900'
            }`} style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Books
            </h2>
            <p className={`text-xs mt-0.5 ${
              darkMode ? 'text-brand-300' : 'text-brand-500'
            }`}>
              Showing {displayedBooks.length} books in store
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
              darkMode ? 'bg-brand-950/60 border-brand-800 text-brand-200' : 'bg-white border-brand-200 text-brand-700'
            }`}>
              <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
              <span className="opacity-70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="default" className={darkMode ? 'bg-[#181326] text-white' : 'bg-white text-brand-900'}>Featured</option>
                <option value="price-asc" className={darkMode ? 'bg-[#181326] text-white' : 'bg-white text-brand-900'}>Price: Low to High</option>
                <option value="price-desc" className={darkMode ? 'bg-[#181326] text-white' : 'bg-white text-brand-900'}>Price: High to Low</option>
              </select>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setBookToEdit(null);
                  setBookFormOpen(true);
                }}
                className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                + Add Book
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="py-5 overflow-x-auto scrollbar-none flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? darkMode
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-900/60'
                      : 'bg-brand-700 text-white shadow-sm'
                    : darkMode
                      ? 'bg-brand-950/60 text-brand-200 border border-brand-800/60 hover:bg-brand-900 hover:text-white'
                      : 'bg-white text-brand-700 border border-brand-200 hover:border-brand-300 hover:bg-brand-50/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active Search message */}
        {searchQuery && (
          <div className={`mb-5 p-3 rounded-xl text-xs flex items-center justify-between border ${
            darkMode 
              ? 'bg-brand-950/40 border-brand-800 text-brand-200' 
              : 'bg-brand-50 border-brand-100 text-brand-800'
          }`}>
            <span>Searching for: <strong>"{searchQuery}"</strong> ({displayedBooks.length} books found)</span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-brand-500 hover:underline font-semibold cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Book Grid */}
        {displayedBooks.length === 0 ? (
          <div className={`py-16 text-center space-y-3 rounded-2xl border my-6 ${
            darkMode ? 'bg-[#181326] border-brand-800/40' : 'bg-white border-brand-100'
          }`}>
            <Search className={`w-8 h-8 mx-auto ${darkMode ? 'text-brand-400' : 'text-brand-400'}`} />
            <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-brand-900'}`}>No books found</h3>
            <p className={`text-xs ${darkMode ? 'text-brand-300' : 'text-brand-500'}`}>
              Try searching with another title or author name.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Books');
              }}
              className="px-4 py-2 bg-brand-600 text-white text-xs font-semibold rounded-xl hover:bg-brand-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.some((w) => w.id === book.id)}
                isAdmin={isAdmin}
                onEditBook={(b) => {
                  setBookToEdit(b);
                  setBookFormOpen(true);
                }}
                onDeleteBook={handleDeleteBook}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onScrollToBooks={scrollToBooks}
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        categories={CATEGORIES}
        onSelectCategory={setSelectedCategory}
        darkMode={darkMode}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleStartCheckout}
        darkMode={darkMode}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
        darkMode={darkMode}
      />

      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={(id) => {
          setWishlist((prev) => prev.filter((b) => b.id !== id));
          showToast('Removed from Wishlist');
        }}
        darkMode={darkMode}
      />

      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setAdminDashboardOpen(true);
          showToast('Admin Mode Enabled');
        }}
        darkMode={darkMode}
      />

      <AdminDashboardModal
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        books={books}
        onOpenNewBook={() => {
          setBookToEdit(null);
          setBookFormOpen(true);
        }}
        onEditBook={(book) => {
          setBookToEdit(book);
          setBookFormOpen(true);
        }}
        onDeleteBook={handleDeleteBook}
        onResetDefaultBooks={handleResetDefaultBooks}
        categories={CATEGORIES}
        darkMode={darkMode}
      />

      <AdminBookFormModal
        isOpen={bookFormOpen}
        onClose={() => {
          setBookFormOpen(false);
          setBookToEdit(null);
        }}
        onSaveBook={handleSaveBook}
        bookToEdit={bookToEdit}
        categories={CATEGORIES}
        darkMode={darkMode}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        darkMode={darkMode}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        darkMode={darkMode}
      />

      {/* Toast Feedback */}
      <Toast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}
