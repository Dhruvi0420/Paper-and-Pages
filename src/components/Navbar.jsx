import React, { useState } from 'react';
import {
  BookOpen, ShoppingBag, Heart, Search, ShieldCheck,
  Menu, X, PlusCircle, Sun, Moon
} from 'lucide-react';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  isAdmin,
  onLogoutAdmin,
  onOpenNewBook,
  onOpenAbout,
  onOpenContact,
  searchQuery,
  setSearchQuery,
  onScrollToBooks,
  darkMode,
  toggleDarkMode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        darkMode
          ? 'bg-[#120e22]/90 border-brand-800/40'
          : 'bg-white/85 border-brand-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-br from-brand-600 to-brand-800 shadow-brand-900/30 text-white'
                  : 'bg-gradient-to-br from-brand-500 to-brand-700 shadow-brand-500/25 text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`text-xl font-extrabold tracking-tight ${
                  darkMode ? 'text-white' : 'text-brand-900'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Paper &amp; Pages
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden lg:flex items-center gap-1 text-sm font-medium ${
              darkMode ? 'text-brand-200' : 'text-brand-700'
            }`}
          >
            {[
              { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              { label: 'Books', action: onScrollToBooks },
              { label: 'About', action: onOpenAbout },
              { label: 'Contact', action: onOpenContact }
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode
                    ? 'hover:bg-brand-900/60 hover:text-white'
                    : 'hover:bg-brand-50 hover:text-brand-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs mx-5">
            <div className="relative w-full">
              <Search
                className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                  darkMode ? 'text-brand-400' : 'text-brand-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'bg-brand-950/60 border-brand-800 text-white placeholder-brand-400 focus:ring-brand-500'
                    : 'bg-brand-50 border-brand-200 text-brand-900 placeholder-brand-400 focus:ring-brand-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded cursor-pointer ${
                    darkMode ? 'text-brand-300 bg-brand-800' : 'text-brand-600 bg-brand-100'
                  }`}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode
                  ? 'text-amber-300 hover:bg-brand-800/60'
                  : 'text-brand-600 hover:bg-brand-50'
              }`}
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                darkMode ? 'text-brand-300 hover:bg-brand-800/60' : 'text-brand-600 hover:bg-brand-50'
              }`}
              title="Saved Books"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md ${
                darkMode
                  ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-900/40'
                  : 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-brand-500/20'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  darkMode ? 'bg-white/20 text-white' : 'bg-white/25 text-white'
                }`}
              >
                {cartCount}
              </span>
            </button>

            {/* Admin */}
            {isAdmin ? (
              <div className="hidden sm:flex items-center gap-1.5 ml-1 pl-2 border-l border-brand-200 dark:border-brand-700">
                <button
                  onClick={onOpenNewBook}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-brand-600 text-white rounded-lg hover:bg-brand-700 flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add
                </button>
                <button
                  onClick={onOpenAdmin}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                    darkMode
                      ? 'bg-brand-800 text-brand-200 hover:bg-brand-700'
                      : 'bg-brand-100 text-brand-800 hover:bg-brand-200'
                  }`}
                >
                  Manage
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="text-xs text-pink-500 hover:underline px-1 cursor-pointer"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className={`hidden sm:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  darkMode
                    ? 'text-brand-300 border-brand-700 hover:bg-brand-800'
                    : 'text-brand-600 border-brand-200 hover:bg-brand-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg cursor-pointer ${
                darkMode ? 'text-brand-200' : 'text-brand-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? 'text-brand-400' : 'text-brand-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books..."
              className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-brand-950/60 border-brand-700 text-white focus:ring-brand-500'
                  : 'bg-brand-50 border-brand-200 text-brand-900 focus:ring-brand-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-1 animate-fadeIn ${
            darkMode ? 'bg-[#120e22] border-brand-800' : 'bg-white border-brand-100'
          }`}
        >
          {[
            {
              label: 'Home',
              action: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }
            },
            {
              label: 'Books',
              action: () => {
                onScrollToBooks();
                setMobileMenuOpen(false);
              }
            },
            {
              label: 'About Us',
              action: () => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }
            },
            {
              label: 'Contact',
              action: () => {
                onOpenContact();
                setMobileMenuOpen(false);
              }
            },
            {
              label: isAdmin ? 'Admin Dashboard' : 'Admin Login',
              action: () => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }
            }
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                darkMode ? 'text-brand-200 hover:bg-brand-900' : 'text-brand-700 hover:bg-brand-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
