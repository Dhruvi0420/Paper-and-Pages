import React from 'react';
import { ShoppingBag, Heart, Edit2, Trash2 } from 'lucide-react';

export default function BookCard({
  book, onAddToCart, onToggleWishlist, isWishlisted,
  isAdmin, onEditBook, onDeleteBook, darkMode
}) {
  return (
    <div className={`group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
      darkMode
        ? 'bg-[#1e1b34] border border-brand-800/40 hover:border-brand-600/60 shadow-lg shadow-black/20 hover:shadow-brand-800/20'
        : 'bg-white border border-brand-100 hover:border-brand-300 shadow-sm hover:shadow-xl hover:shadow-brand-200/30'
    }`}>

      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
          darkMode
            ? 'bg-gradient-to-t from-[#1e1b34]/80 via-transparent to-transparent'
            : 'bg-gradient-to-t from-brand-900/30 via-transparent to-transparent'
        }`} />

        {/* Wishlist Heart */}
        <button
          onClick={() => onToggleWishlist(book)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer z-10 ${
            isWishlisted
              ? 'bg-pink-500/90 text-white scale-110'
              : darkMode
                ? 'bg-black/30 text-white/80 hover:bg-pink-500/80 hover:text-white'
                : 'bg-white/80 text-brand-500 hover:bg-pink-500/90 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick Add button on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={() => onAddToCart(book)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg cursor-pointer active:scale-95 backdrop-blur-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category pill */}
        <span className={`self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
          darkMode
            ? 'bg-brand-800/50 text-brand-300'
            : 'bg-brand-100 text-brand-700'
        }`}>
          {book.category}
        </span>

        {/* Title */}
        <h3 className={`font-bold text-[15px] leading-snug line-clamp-1 mb-1 ${
          darkMode ? 'text-white' : 'text-brand-900'
        }`} title={book.title}>
          {book.title}
        </h3>

        {/* Author */}
        <p className={`text-xs mb-3 ${darkMode ? 'text-brand-400' : 'text-brand-500'}`}>
          Written by — <span className={`font-medium ${darkMode ? 'text-brand-200' : 'text-brand-700'}`}>{book.author}</span>
        </p>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <span className={`text-lg font-extrabold ${
            darkMode ? 'text-brand-300' : 'text-brand-800'
          }`}>
            ₹{book.price}
          </span>

          {/* Mobile Add button (always visible) */}
          <button
            onClick={() => onAddToCart(book)}
            className={`sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              darkMode
                ? 'bg-brand-700 text-white hover:bg-brand-600'
                : 'bg-brand-600 text-white hover:bg-brand-700'
            }`}
          >
            <ShoppingBag className="w-3 h-3" /> Add
          </button>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className={`mt-3 pt-2.5 border-t border-dashed flex items-center justify-between text-xs ${
            darkMode ? 'border-brand-700' : 'border-brand-200'
          }`}>
            <button onClick={() => onEditBook(book)}
              className={`flex items-center gap-1 font-medium px-2 py-1 rounded-md transition-colors ${
                darkMode ? 'text-brand-300 hover:bg-brand-800' : 'text-brand-600 hover:bg-brand-50'
              }`}
            >
              <Edit2 className="w-3 h-3" /> Edit
            </button>
            <button onClick={() => onDeleteBook(book.id)}
              className="flex items-center gap-1 font-medium text-pink-500 hover:text-pink-600 px-2 py-1 rounded-md hover:bg-pink-50/10"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
