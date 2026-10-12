import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { fileURLToPath } from 'url';

dotenv.config();

// Use reliable DNS servers to resolve MongoDB Atlas SRV records on Windows networks
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if custom DNS cannot be set in the current runtime environment
}

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Connects to MongoDB database using MONGODB_URI from .env
 */
export const connectDB = async () => {
  if (!MONGODB_URI) {
    const errorMsg = '❌ [MongoDB] Error: MONGODB_URI is not defined in .env file.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB] Connection error: ${error.message}`);
    throw error;
  }
};

// If run directly via `node db.js`, test the database connection
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('🔄 Connecting to MongoDB using .env URI...');
  connectDB()
    .then((conn) => {
      console.log(`🎉 Connected to database: "${conn.connection.name}" on host: ${conn.connection.host}`);
      process.exit(0);
    })
    .catch((err) => {
      console.error('💥 Connection test failed:', err.message);
      process.exit(1);
    });
}

export default connectDB;
