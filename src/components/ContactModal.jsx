import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const bg = darkMode ? 'bg-[#1e1b34]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const subtext = darkMode ? 'text-brand-400' : 'text-brand-500';
  const inputCls = `w-full text-xs p-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    darkMode 
      ? 'bg-brand-900/50 border-brand-700 text-white placeholder-brand-500' 
      : 'bg-brand-50/60 border-brand-200 text-brand-900 placeholder-brand-400'
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className={`relative ${bg} rounded-3xl max-w-lg w-full shadow-2xl border ${border} overflow-hidden my-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer ${
            darkMode ? 'text-brand-400 hover:bg-brand-800' : 'text-brand-400 hover:bg-brand-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className={`text-2xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              Message Received!
            </h3>
            <p className={`text-xs ${subtext} max-w-sm mx-auto leading-relaxed`}>
              Thank you for reaching out to Paper &amp; Pages. We'll reply to <span className={`font-semibold ${text}`}>{formData.email}</span> shortly.
            </p>
            <button
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-1">
              <Mail className={`w-5 h-5 ${darkMode ? 'text-brand-400' : 'text-brand-600'}`} />
              <h2 className={`text-xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact Us
              </h2>
            </div>
            <p className={`text-xs mb-5 ${subtext}`}>
              Have questions about an order or book recommendation? Drop us a message!
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${text}`}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${text}`}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Order inquiry, book question..."
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${text}`}>Message</label>
                <textarea
                  required
                  rows="3"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className={inputCls}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
