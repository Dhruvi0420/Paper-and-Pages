import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistModal({ isOpen, onClose, wishlist, onAddToCart, onRemoveFromWishlist, darkMode }) {
  if (!isOpen) return null;
  const bg = darkMode ? 'bg-[#1e1b34]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const sub = darkMode ? 'text-brand-400' : 'text-brand-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className={`relative ${bg} rounded-3xl max-w-lg w-full shadow-2xl border ${border} overflow-hidden my-8 max-h-[80vh] flex flex-col`} onClick={e => e.stopPropagation()}>
        <div className={`p-5 border-b ${border} flex items-center justify-between ${darkMode ? 'bg-brand-900/30' : 'bg-brand-50/50'}`}>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <h3 className={`text-base font-bold ${text}`}>Wishlist ({wishlist.length})</h3>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'hover:bg-brand-800 text-brand-400' : 'hover:bg-brand-100 text-brand-500'}`}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className={`py-12 text-center text-xs ${sub}`}>No saved books yet.</div>
          ) : wishlist.map(book => (
            <div key={book.id} className={`flex items-center justify-between gap-3 p-3 rounded-xl border ${darkMode ? 'border-brand-800/40 bg-brand-900/20' : 'border-brand-100'}`}>
              <div className="flex items-center gap-3 min-w-0">
                <img src={book.image} alt={book.title} className="w-11 h-14 object-cover rounded-lg flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className={`text-xs font-bold truncate ${text}`}>{book.title}</h4>
                  <p className={`text-[11px] truncate ${sub}`}>Written by — {book.author}</p>
                  <span className={`text-xs font-bold ${darkMode ? 'text-brand-300' : 'text-brand-800'}`}>₹{book.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => onAddToCart(book)} className="px-2.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"><ShoppingBag className="w-3.5 h-3.5" /> Add</button>
                <button onClick={() => onRemoveFromWishlist(book.id)} className="p-1.5 text-pink-400 hover:text-pink-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
