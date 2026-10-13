import React, { useState } from 'react';
import { X, Lock, KeyRound } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess, darkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (!isOpen) return null;
  const bg = darkMode ? 'bg-[#1e1b34]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const inputCls = `w-full text-sm p-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 ${darkMode ? 'bg-brand-900/50 border-brand-700 text-white' : 'bg-brand-50 border-brand-200 text-brand-900'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') { setError(''); onLoginSuccess(); onClose(); }
    else setError('Invalid credentials. Use admin / 1234');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className={`relative ${bg} rounded-3xl max-w-md w-full shadow-2xl border ${border} p-7`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className={`absolute top-4 right-4 p-1.5 rounded-lg ${darkMode ? 'text-brand-400 hover:bg-brand-800' : 'text-brand-400 hover:bg-brand-100'}`}><X className="w-5 h-5" /></button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 mb-3"><Lock className="w-7 h-7" /></div>
          <h3 className={`text-xl font-bold ${text}`} style={{ fontFamily: "'Playfair Display', serif" }}>Store Manager</h3>
          <p className={`text-xs mt-1 ${darkMode ? 'text-brand-400' : 'text-brand-500'}`}>Login to manage the bookstore catalog.</p>
        </div>
        {error && <div className="mb-4 p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-xs text-pink-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Username</label><input type="text" required value={username} onChange={e => setUsername(e.target.value)} className={inputCls} placeholder="admin" /></div>
          <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Password</label><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" /></div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-semibold text-sm shadow-md cursor-pointer">Sign In</button>
        </form>
        <div className={`mt-5 pt-4 border-t text-center ${darkMode ? 'border-brand-800' : 'border-brand-100'}`}>
          <button onClick={() => { setUsername('admin'); setPassword('1234'); setError(''); onLoginSuccess(); onClose(); }}
            className="text-xs text-brand-500 hover:text-brand-600 hover:underline font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer">
            <KeyRound className="w-3.5 h-3.5" /> Quick Demo Login
          </button>
        </div>
      </div>
    </div>
  );
}
