import mongoose from 'mongoose';

/**
 * Mongoose Schema for Bookstore Books
 * Matches the structure of initialBooks.js and the Admin Panel form
 */
export const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Book ID is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      default: 'Fiction',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Indexes for faster lookups & search
bookSchema.index({ category: 1 });
bookSchema.index({ title: 'text', author: 'text' });

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default Book;
