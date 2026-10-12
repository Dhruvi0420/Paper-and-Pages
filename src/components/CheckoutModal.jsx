import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, checkoutData, onOrderSuccess, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // If modal is not open or checkout data is not ready, do not render
  if (!isOpen || !checkoutData) return null;

  const bg = darkMode ? 'bg-[#1e182f]' : 'bg-white';
  const border = darkMode ? 'border-brand-700/50' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const subtext = darkMode ? 'text-brand-300' : 'text-brand-600';
  const inputCls = `w-full text-xs p-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    darkMode 
      ? 'bg-brand-950/70 border-brand-700/70 text-white placeholder-brand-400' 
      : 'bg-brand-50/60 border-brand-200 text-brand-900 placeholder-brand-400'
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);

    const orderData = {
      id: newOrderId,
      customerName: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      fullAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      items: checkoutData.items || [],
      totalAmount: checkoutData.total,
      totalItems: checkoutData.totalItems || (checkoutData.items ? checkoutData.items.reduce((a, b) => a + b.quantity, 0) : 1),
      date: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrderComplete(true);
    onOrderSuccess(orderData);
  };

  const handleFinish = () => {
    setOrderComplete(false);
    setFormData({ name: '', email: '', mobile: '', address: '', city: '', pincode: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`relative ${bg} rounded-3xl max-w-lg w-full shadow-2xl border ${border} overflow-hidden my-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleFinish} 
          className={`absolute top-4 right-4 p-1.5 rounded-lg z-10 transition-colors cursor-pointer ${
            darkMode ? 'text-brand-300 hover:bg-brand-800' : 'text-brand-400 hover:bg-brand-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-float">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className={`text-2xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              Order Placed Successfully!
            </h2>
            <p className={`text-xs ${subtext}`}>
              Order ID: <strong className={text}>{orderId}</strong>
            </p>

            <div className={`p-4 rounded-2xl border text-left text-xs space-y-2.5 ${
              darkMode ? 'bg-brand-950/60 border-brand-800' : 'bg-brand-50/70 border-brand-200'
            }`}>
              <div className="flex justify-between">
                <span className={subtext}>Deliver To:</span>
                <span className={`font-semibold ${text}`}>
                  {formData.name || 'Customer'}, {formData.city || 'City'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={subtext}>Gmail:</span>
                <span className={`font-semibold ${text}`}>
                  {formData.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={subtext}>Contact:</span>
                <span className={`font-semibold ${text}`}>
                  {formData.mobile || '-'}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 border-brand-200/50 dark:border-brand-800/50">
                <span className={subtext}>Total Amount:</span>
                <span className={`font-bold text-sm ${darkMode ? 'text-brand-200' : 'text-brand-700'}`}>
                  ₹{checkoutData.total}
                </span>
              </div>
            </div>

            <p className={`text-[11px] ${subtext}`}>
              Order details saved to Admin Panel. Thank you for ordering from Paper &amp; Pages!
            </p>

            <button 
              onClick={handleFinish} 
              className="px-7 py-3 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold rounded-xl text-xs shadow-md cursor-pointer transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingBag className={`w-5 h-5 ${darkMode ? 'text-brand-300' : 'text-brand-600'}`} />
              <h2 className={`text-xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Delivery Details
              </h2>
            </div>
            <p className={`text-xs mb-5 ${subtext}`}>
              Enter your shipping information and Gmail to complete your order.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>Username / Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                    className={inputCls} 
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>Mobile Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="10-digit number"
                    value={formData.mobile} 
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })} 
                    className={inputCls} 
                  />
                </div>
              </div>

              {/* Gmail / Email Field */}
              <div>
                <label className={`block text-xs font-semibold mb-1 ${text}`}>Gmail / Email Address *</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required 
                    placeholder="yourname@gmail.com"
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    className={inputCls} 
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${text}`}>Street Address *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="House / Flat No, Street name, Locality"
                  value={formData.address} 
                  onChange={e => setFormData({ ...formData, address: e.target.value })} 
                  className={inputCls} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>City *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Mumbai"
                    value={formData.city} 
                    onChange={e => setFormData({ ...formData, city: e.target.value })} 
                    className={inputCls} 
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>Pincode *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="6-digit pincode"
                    value={formData.pincode} 
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })} 
                    className={inputCls} 
                  />
                </div>
              </div>

              {/* Books list preview */}
              {checkoutData.items && checkoutData.items.length > 0 && (
                <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                  darkMode ? 'bg-brand-950/40 border-brand-800' : 'bg-brand-50/50 border-brand-100'
                }`}>
                  <span className={`block font-semibold ${text}`}>Books to Order ({checkoutData.items.length}):</span>
                  <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                    {checkoutData.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-[11px]">
                        <span className={`truncate max-w-[220px] ${subtext}`}>{item.title} × {item.quantity}</span>
                        <span className={`font-semibold ${text}`}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary Pill */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs mt-2 ${
                darkMode ? 'bg-brand-950/60 border-brand-800' : 'bg-brand-50/70 border-brand-200'
              }`}>
                <span className={subtext}>
                  Total Items: <strong className={text}>{checkoutData.totalItems || checkoutData.items?.length || 1}</strong>
                </span>
                <span className="font-bold text-sm">
                  Total Amount: <span className={darkMode ? 'text-brand-200' : 'text-brand-700'}>₹{checkoutData.total}</span>
                </span>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-sm shadow-lg shadow-brand-600/20 cursor-pointer active:scale-95 transition-all"
                >
                  Place Order — ₹{checkoutData.total}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
