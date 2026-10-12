import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, darkMode }) {
  return (
    <section className={`relative overflow-hidden py-16 md:py-20 transition-colors duration-300 ${
      darkMode
        ? 'bg-gradient-to-br from-[#0f0c18] via-[#1a142e] to-[#120f20]'
        : 'bg-gradient-to-br from-brand-50 via-warm-50 to-brand-100/60'
    }`}>
      {/* Decorative Gradient Orbs */}
      <div className={`absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl -z-0 pointer-events-none ${
        darkMode ? 'bg-brand-700/15' : 'bg-brand-200/40'
      }`} />
      <div className={`absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full blur-3xl -z-0 pointer-events-none ${
        darkMode ? 'bg-brand-900/25' : 'bg-warm-200/30'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border ${
            darkMode
              ? 'bg-brand-900/60 border-brand-700/50 text-brand-300'
              : 'bg-white/80 backdrop-blur-sm border-brand-200 text-brand-700 shadow-xs'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Neighborhood Bookstore</span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] ${
            darkMode ? 'text-white' : 'text-brand-900'
          }`} style={{ fontFamily: "'Playfair Display', serif" }}>
            Discover Books That{' '}
            <span className={`${
              darkMode
                ? 'bg-gradient-to-r from-brand-300 to-brand-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent'
            }`}>
              Inspire You
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${
            darkMode ? 'text-brand-300' : 'text-brand-600'
          }`}>
            Explore our hand-picked collection of bestselling fiction, self-help, finance, and timeless classics at student-friendly prices.
          </p>

          {/* CTA Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-sm shadow-xl shadow-brand-600/25 transition-all cursor-pointer active:scale-95"
            >
              <span>Browse All Books</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
