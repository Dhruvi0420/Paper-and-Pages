import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import Book from './models/Book.js';
import Order from './models/Order.js';
import { SEED_BOOKS as DEFAULT_BOOKS } from './seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------
// Default Initial Books Data (Imported from ./seed.js)
// ---------------------------------------------------------------------

// In-memory fallback if MongoDB connection string is not configured yet
let inMemoryBooks = [...DEFAULT_BOOKS];
let inMemoryOrders = [];

// ---------------------------------------------------------------------
// Mongoose Models are imported from ./models/Book.js & ./models/Order.js
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// Connect to MongoDB
// ---------------------------------------------------------------------
let isMongoConnected = false;

async function connectMongo() {
  if (!MONGODB_URI) {
    console.log(`ℹ️ [MongoDB] No MONGODB_URI set in .env yet. Running in fallback mode.`);
    console.log(`ℹ️ [MongoDB] Add your MONGODB_URI in .env to connect your database.`);
    return;
  }

  try {
    await connectDB();
    isMongoConnected = true;

    // Auto-seed if database collection is empty
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log(`🌱 [MongoDB] Seeding initial 12 books to MongoDB collection...`);
      await Book.insertMany(DEFAULT_BOOKS);
      console.log(`✅ [MongoDB] Seed complete with 12 bookstore books!`);
    } else {
      console.log(`📚 [MongoDB] Collection has ${count} books ready in database.`);
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn(`⚠️ [MongoDB] Connection warning: ${err.message}`);
    console.log(`ℹ️ [MongoDB] Running in ready mode until MongoDB connection is established.`);
  }
}

connectMongo();

mongoose.connection.on('disconnected', () => {
  isMongoConnected = false;
  console.log(`⚠️ [MongoDB] Disconnected from server.`);
});

mongoose.connection.on('reconnected', () => {
  isMongoConnected = true;
  console.log(`✅ [MongoDB] Reconnected to server.`);
});

// ---------------------------------------------------------------------
// API Routes
// ---------------------------------------------------------------------

// Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    mongodb: isMongoConnected ? 'connected' : 'disconnected',
    uriSet: Boolean(MONGODB_URI),
    port: PORT
  });
});

// GET all books (strictly from MongoDB or in-memory fallback)
app.get('/api/books', async (req, res) => {
  try {
    if (isMongoConnected) {
      const books = await Book.find().sort({ createdAt: 1 }).lean();
      return res.json({ success: true, books, source: 'mongodb' });
    }
  } catch (err) {
    console.error('Error fetching books from MongoDB:', err);
  }
  res.json({ success: true, books: inMemoryBooks, source: 'in-memory' });
});

// POST a new book (saves directly to MongoDB)
app.post('/api/books', async (req, res) => {
  try {
    const bookData = req.body;
    if (!bookData.id) {
      bookData.id = 'book-' + Date.now();
    }

    if (isMongoConnected) {
      const created = await Book.create(bookData);
      console.log(`📖 [MongoDB] Added book: "${created.title}" (₹${created.price})`);
      return res.status(201).json({ success: true, book: created, source: 'mongodb' });
    }

    // In-memory fallback
    inMemoryBooks.unshift(bookData);
    res.status(201).json({ success: true, book: bookData, source: 'in-memory' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update a book in MongoDB
app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isMongoConnected) {
      const updated = await Book.findOneAndUpdate({ id }, updateData, { returnDocument: 'after' });
      if (updated) {
        console.log(`✏️ [MongoDB] Updated book: "${updated.title}"`);
        return res.json({ success: true, book: updated, source: 'mongodb' });
      }
    }

    // In-memory fallback
    const idx = inMemoryBooks.findIndex(b => b.id === id);
    if (idx >= 0) inMemoryBooks[idx] = updateData;
    res.json({ success: true, book: updateData, source: 'in-memory' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE a book from MongoDB
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isMongoConnected) {
      await Book.findOneAndDelete({ id });
      console.log(`🗑️ [MongoDB] Deleted book id: ${id}`);
    }
    inMemoryBooks = inMemoryBooks.filter(b => b.id !== id);
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST reset to default bookstore collection in MongoDB
app.post('/api/books/reset', async (req, res) => {
  try {
    if (isMongoConnected) {
      await Book.deleteMany({});
      await Book.insertMany(DEFAULT_BOOKS);
      console.log(`🔄 [MongoDB] Restored default 12 books in MongoDB.`);
      const books = await Book.find().sort({ createdAt: 1 }).lean();
      return res.json({ success: true, books, source: 'mongodb' });
    }

    inMemoryBooks = [...DEFAULT_BOOKS];
    res.json({ success: true, books: inMemoryBooks, source: 'in-memory' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all customer orders from MongoDB
app.get('/api/orders', async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return res.json({ success: true, orders, source: 'mongodb' });
    }
  } catch (err) {
    console.error('Error fetching orders from MongoDB:', err);
  }
  res.json({ success: true, orders: inMemoryOrders, source: 'in-memory' });
});

// POST save order in MongoDB
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    if (isMongoConnected) {
      const order = await Order.create(orderData);
      console.log(`🛍️ [MongoDB] Saved customer order: ${order.id} (₹${order.totalAmount})`);
      return res.status(201).json({ success: true, order, source: 'mongodb' });
    }

    inMemoryOrders.unshift(orderData);
    res.status(201).json({ success: true, order: orderData, source: 'in-memory' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ---------------------------------------------------------------------
// Production Static Frontend & Client Routing
// ---------------------------------------------------------------------
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// For all non-API requests, deliver React index.html for client routing
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// ---------------------------------------------------------------------
// Start Express Server
// ---------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🚀 Paper & Pages Express + MongoDB Backend`);
  console.log(` 🌐 Server URL: http://localhost:${PORT}`);
  console.log(` 🍃 MongoDB:    ${MONGODB_URI || '(Awaiting URI in .env)'}`);
  console.log(`=======================================================`);
});
