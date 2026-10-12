import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import Book from './models/Book.js';

/**
 * Seed data matching initialBooks.js and Mongoose Book Schema
 */
export const SEED_BOOKS = [
  {
    id: "book-1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance & Life",
    price: 399,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know, it's about how you behave.",
    rating: 4.8,
    inStock: true,
    featured: true,
  },
  {
    id: "book-2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    price: 550,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    description: "An easy and proven way to build good habits and break bad ones. Tiny changes make a remarkable difference.",
    rating: 4.9,
    inStock: true,
    featured: true,
  },
  {
    id: "book-3",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    price: 450,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    description: "Between life and death there is a library. Every book provides a chance to try another life you could have lived.",
    rating: 4.6,
    inStock: true,
    featured: false,
  },
  {
    id: "book-5",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Non-Fiction",
    price: 699,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution.",
    rating: 4.7,
    inStock: true,
    featured: true,
  },
  {
    id: "book-6",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Mystery & Thriller",
    price: 420,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
    description: "A shocking psychological thriller of a woman's act of violence against her husband and the therapist obsessed with uncovering her motive.",
    rating: 4.5,
    inStock: true,
    featured: false,
  },
  {
    id: "book-7",
    title: "Days at the Morisaki Bookshop",
    author: "Satoshi Yagisawa",
    category: "Fiction",
    price: 380,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    description: "A cozy and heartwarming novel set in Tokyo's second-hand book town Jimbocho about healing and second chances.",
    rating: 4.6,
    inStock: true,
    featured: false,
  },
  {
    id: "book-8",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finance & Life",
    price: 399,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    description: "What the rich teach their kids about money that the poor and middle class do not.",
    rating: 4.7,
    inStock: true,
    featured: false,
  },
  {
    id: "book-9",
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    category: "Fiction",
    price: 420,
    image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80",
    description: "In a small back alley in Tokyo, there is a cafe that has been brewing carefully brewed coffee for more than a century.",
    rating: 4.5,
    inStock: true,
    featured: false,
  },
  {
    id: "book-10",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self-Help",
    price: 480,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
    description: "Rules for focused success in a distracted world. The superpower of the 21st century knowledge economy.",
    rating: 4.8,
    inStock: true,
    featured: false,
  },
  {
    id: "book-11",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Classics",
    price: 350,
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    description: "A timeless classic of American literature exploring human nature, compassion, and justice.",
    rating: 4.9,
    inStock: true,
    featured: false,
  },
  {
    id: "book-12",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    price: 299,
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
    description: "A mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
    rating: 4.7,
    inStock: true,
    featured: false,
  },
];

async function seedDatabase() {
  const isClean = process.argv.includes('--clean');

  console.log('====================================================');
  console.log(' 🌱 Paper & Pages — MongoDB Book Seeding Script');
  console.log('====================================================');

  try {
    console.log('📡 Connecting to MongoDB via db.js...');
    await connectDB();

    if (isClean) {
      console.log('🧹 Flag --clean detected: Removing existing books collection...');
      await Book.deleteMany({});
      console.log('🗑️ Existing books removed.');
    }

    console.log(`📦 Seeding ${SEED_BOOKS.length} books according to BookSchema...`);

    let insertedCount = 0;
    let updatedCount = 0;

    for (const book of SEED_BOOKS) {
      const result = await Book.findOneAndUpdate(
        { id: book.id },
        { $set: book },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      );

      const status = result.isNew ? 'Inserted' : 'Upserted';
      if (result.isNew) insertedCount++;
      else updatedCount++;

      console.log(`  ✓ [${book.id}] "${book.title}" — ₹${book.price} (${book.category})`);
    }

    const totalCount = await Book.countDocuments();

    console.log('====================================================');
    console.log(`🎉 Seeding complete!`);
    console.log(`📚 Total books now in MongoDB: ${totalCount}`);
    console.log('====================================================');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
}

// Only run when executed directly (node seed.js)
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  seedDatabase();
}

export default seedDatabase;
