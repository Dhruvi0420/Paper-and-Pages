import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout, darkMode
}) {
  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const bg = darkMode ? 'bg-[#16142a]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-100';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const subtext = darkMode ? 'text-brand-400' : 'text-brand-500';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md ${bg} shadow-2xl flex flex-col border-l ${border}`}>

          {/* Header */}
          <div className={`p-5 border-b ${border} flex items-center justify-between ${
            darkMode ? 'bg-brand-900/30' : 'bg-brand-50/50'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-brand-800 text-brand-300' : 'bg-brand-100 text-brand-700'
              }`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-base font-bold ${text}`}>My Cart</h2>
                <span className={`text-xs ${subtext}`}>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                darkMode ? 'hover:bg-brand-800 text-brand-400' : 'hover:bg-brand-100 text-brand-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${
                  darkMode ? 'bg-brand-800/50 text-brand-400' : 'bg-brand-100 text-brand-500'
                }`}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold ${text}`}>Your Cart is Empty</h3>
                <p className={`text-xs ${subtext} max-w-xs mx-auto`}>
                  Looks like you haven't added any books yet. Explore our store to find your next read!
                </p>
                <button 
                  onClick={onClose} 
                  className="mt-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Explore Books
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex gap-3.5 p-3.5 rounded-2xl border transition-colors ${
                    darkMode 
                      ? 'border-brand-800/40 bg-brand-900/20 hover:bg-brand-800/30' 
                      : 'border-brand-100 bg-white hover:bg-brand-50/40'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-20 object-cover rounded-xl flex-shrink-0 bg-brand-100" 
                  />
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className={`text-xs font-bold truncate ${text}`} title={item.title}>
                        {item.title}
                      </h4>
                      <p className={`text-[11px] truncate mt-0.5 ${subtext}`}>
                        Written by — {item.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity controls */}
                      <div className={`flex items-center border rounded-lg overflow-hidden ${
                        darkMode ? 'border-brand-700 bg-brand-900/40' : 'border-brand-200 bg-brand-50/50'
                      }`}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                          className={`px-2 py-0.5 text-xs font-bold transition-colors cursor-pointer ${
                            darkMode ? 'hover:bg-brand-800 text-brand-300' : 'hover:bg-brand-100 text-brand-700'
                          }`}
                        >
                          −
                        </button>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold min-w-6 text-center ${text}`}>
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                          className={`px-2 py-0.5 text-xs font-bold transition-colors cursor-pointer ${
                            darkMode ? 'hover:bg-brand-800 text-brand-300' : 'hover:bg-brand-100 text-brand-700'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${text}`}>
                          ₹{item.price * item.quantity}
                        </span>
                        <button 
                          onClick={() => onRemoveItem(item.id)} 
                          className="text-pink-400 hover:text-pink-500 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Simple Order Summary Footer (No coupons, No discount codes, No fake delivery bars) */}
          {cartItems.length > 0 && (
            <div className={`p-5 border-t space-y-4 ${
              darkMode ? 'border-brand-800/40 bg-brand-900/30' : 'border-brand-100 bg-brand-50/50'
            }`}>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className={subtext}>Total Items:</span>
                  <span className={`font-semibold ${text}`}>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className={subtext}>Subtotal:</span>
                  <span className={`font-semibold ${text}`}>₹{totalAmount}</span>
                </div>
                <div className={`flex justify-between text-base font-bold pt-2.5 border-t ${
                  text
                } ${darkMode ? 'border-brand-800/50' : 'border-brand-200'}`}>
                  <span>Total Amount:</span>
                  <span className={darkMode ? 'text-brand-300' : 'text-brand-700'}>
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => onCheckout({ total: totalAmount, totalItems, items: cartItems })}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 cursor-pointer active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className={`text-[11px] text-center ${subtext}`}>
                Delivery details will be collected on the next step.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
