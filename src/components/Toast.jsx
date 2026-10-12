import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const isCart = toast.type === 'cart';
        const isWishlist = toast.type === 'wishlist';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 animate-slideInRight"
          >
            {isCart && <ShoppingBag className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {isWishlist && <Heart className="w-4 h-4 text-rose-400 fill-rose-400 flex-shrink-0" />}
            {!isCart && !isWishlist && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}

            <div className="flex-1 min-w-0 text-xs">
              <span className="font-semibold block text-slate-100">{toast.title}</span>
              {toast.message && <span className="text-slate-400 block truncate">{toast.message}</span>}
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-500 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
