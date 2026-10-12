import React, { useState, useEffect } from 'react';
import { X, Upload, BookOpen } from 'lucide-react';

export default function AdminBookFormModal({ isOpen, onClose, onSaveBook, bookToEdit, categories, darkMode }) {
  const [formData, setFormData] = useState({ title: '', author: '', category: 'Fiction', price: 399, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80' });

  useEffect(() => {
    if (bookToEdit) setFormData(bookToEdit);
    else setFormData({ title: '', author: '', category: 'Fiction', price: 399, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80' });
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;
  const bg = darkMode ? 'bg-[#1e1b34]' : 'bg-white';
  const border = darkMode ? 'border-brand-800/40' : 'border-brand-200';
  const text = darkMode ? 'text-white' : 'text-brand-900';
  const inputCls = `w-full text-xs p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-500 ${darkMode ? 'bg-brand-900/50 border-brand-700 text-white' : 'bg-brand-50 border-brand-200 text-brand-900'}`;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const r = new FileReader(); r.onloadend = () => setFormData({...formData, image: r.result}); r.readAsDataURL(file); }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return alert("Provide title and author.");
    onSaveBook({ ...formData, id: bookToEdit ? bookToEdit.id : 'book-' + Date.now(), price: parseInt(formData.price) || 299 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className={`relative ${bg} rounded-3xl max-w-md w-full shadow-2xl border ${border} overflow-hidden my-8`} onClick={e => e.stopPropagation()}>
        <div className={`p-4 border-b ${border} flex items-center justify-between ${darkMode ? 'bg-brand-900/30' : 'bg-brand-50/50'}`}>
          <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-brand-600" /><h3 className={`text-base font-bold ${text}`}>{bookToEdit ? 'Edit Book' : 'Add New Book'}</h3></div>
          <button onClick={onClose} className={`p-1 rounded-lg ${darkMode ? 'text-brand-400 hover:bg-brand-800' : 'text-brand-400 hover:bg-brand-100'}`}><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Book Title *</label><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputCls} /></div>
          <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Written by (Author) *</label><input type="text" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Price (₹) *</label><input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className={inputCls} /></div>
            <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className={inputCls + ' bg-white dark:bg-brand-900'}>
                {categories.filter(c => c !== "All Books").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div><label className={`block text-xs font-semibold mb-1 ${text}`}>Cover Image URL</label><input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className={inputCls} /></div>
          <label className={`flex items-center justify-center gap-2 p-2.5 border-2 border-dashed rounded-xl cursor-pointer text-xs ${darkMode ? 'border-brand-700 text-brand-400 hover:border-brand-500' : 'border-brand-200 text-brand-500 hover:border-brand-400'}`}>
            <Upload className="w-3.5 h-3.5" /><span>Or Upload Image</span><input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
          {formData.image && (
            <div className={`flex items-center gap-3 p-3 rounded-xl border ${darkMode ? 'border-brand-800 bg-brand-900/20' : 'border-brand-100 bg-brand-50'}`}>
              <img src={formData.image} alt="Preview" className="w-10 h-14 object-cover rounded-lg" />
              <div className="text-xs"><span className={`font-semibold ${text} block truncate`}>{formData.title || "Title"}</span><span className={`${darkMode ? 'text-brand-400' : 'text-brand-500'} block`}>Written by — {formData.author || "Author"}</span><span className={`font-bold ${text}`}>₹{formData.price}</span></div>
            </div>
          )}
          <div className="pt-1 flex justify-end gap-2">
            <button type="button" onClick={onClose} className={`px-3 py-2 text-xs font-semibold rounded-xl ${darkMode ? 'text-brand-300 hover:bg-brand-800' : 'text-brand-600 hover:bg-brand-50'}`}>Cancel</button>
            <button type="submit" className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-xl shadow-md cursor-pointer">{bookToEdit ? 'Save Changes' : 'Add Book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
