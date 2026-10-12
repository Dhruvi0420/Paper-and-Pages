import React from 'react';
import { X, BookOpen } from 'lucide-react';

export default function AboutModal({ isOpen, onClose, darkMode }) {
  if (!isOpen) return null;

  const bg = darkMode ? 'bg-[#1e1b34]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const subtext = darkMode ? 'text-brand-300' : 'text-brand-600';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`relative ${bg} rounded-3xl max-w-lg w-full shadow-2xl border ${border} overflow-hidden my-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
            darkMode ? 'text-brand-400 hover:bg-brand-800' : 'text-brand-400 hover:bg-brand-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
            darkMode ? 'bg-brand-800 text-brand-300' : 'bg-brand-100 text-brand-700'
          }`}>
            <BookOpen className="w-6 h-6" />
          </div>

          <h2 className={`text-2xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
            About Paper &amp; Pages
          </h2>

          <p className={`text-xs sm:text-sm leading-relaxed ${subtext}`}>
            Welcome to <strong className={text}>Paper &amp; Pages</strong>! We are an independent online bookstore dedicated to bringing you thoughtful, inspiring, and affordable books.
          </p>

          <p className={`text-xs sm:text-sm leading-relaxed ${subtext}`}>
            From bestsellers in personal growth and finance to captivating fiction and timeless classics, our collection is curated to make reading an enjoyable daily habit for everyone.
          </p>

          <div className="pt-4 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white rounded-xl text-xs font-semibold shadow-md cursor-pointer transition-all"
            >
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
