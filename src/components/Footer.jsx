import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

export default function Footer({ onScrollToBooks, onOpenAbout, onOpenContact, categories, onSelectCategory, darkMode }) {
  const bg = darkMode ? 'bg-[#121020] border-brand-800/40 text-brand-300' : 'bg-white border-brand-100 text-brand-700';
  const textHead = darkMode ? 'text-white' : 'text-brand-900';
  const textLink = darkMode ? 'text-brand-300 hover:text-white' : 'text-brand-600 hover:text-brand-900';

  return (
    <footer className={`border-t text-xs py-12 transition-colors duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md ${
                darkMode ? 'bg-gradient-to-br from-brand-600 to-brand-800' : 'bg-gradient-to-br from-brand-500 to-brand-700'
              }`}>
                <BookOpen className="w-4 h-4" />
              </div>
              <span className={`text-lg font-bold tracking-tight ${textHead}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Paper &amp; Pages
              </span>
            </div>
            <p className={`leading-relaxed text-[11px] ${darkMode ? 'text-brand-400' : 'text-brand-500'}`}>
              Your neighborhood online bookstore. Handpicked titles across fiction, self-help, and classics delivered to your doorstep.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-2.5">
            <h4 className={`font-bold uppercase tracking-wider text-[11px] ${textHead}`}>
              Categories
            </h4>
            <ul className="space-y-1.5">
              {categories.slice(1, 6).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onScrollToBooks();
                    }}
                    className={`transition-colors cursor-pointer text-left ${textLink}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-2.5">
            <h4 className={`font-bold uppercase tracking-wider text-[11px] ${textHead}`}>
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`transition-colors cursor-pointer ${textLink}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToBooks}
                  className={`transition-colors cursor-pointer ${textLink}`}
                >
                  Browse Books
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className={`transition-colors cursor-pointer ${textLink}`}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className={`transition-colors cursor-pointer ${textLink}`}
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Info */}
          <div className="space-y-2.5">
            <h4 className={`font-bold uppercase tracking-wider text-[11px] ${textHead}`}>
              Store Info
            </h4>
            <p className={`text-[11px] leading-relaxed ${darkMode ? 'text-brand-400' : 'text-brand-500'}`}>
              Paper &amp; Pages is a student project bookstore showcasing clean UI, responsive catalog, and simple shopping cart experience.
            </p>
            <div className={`pt-2 flex items-center gap-1.5 text-[11px] ${darkMode ? 'text-brand-400' : 'text-brand-500'}`}>
              <span>Built with React &amp; Tailwind</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
          darkMode ? 'border-brand-800/40 text-brand-400' : 'border-brand-100 text-brand-500'
        }`}>
          <p>© {new Date().getFullYear()} Paper &amp; Pages. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
