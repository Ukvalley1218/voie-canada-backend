import mongoose from 'mongoose';
import { runSeed } from '../utils/seed.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Run seed on first connection (uncomment to seed data)
    // await runSeed();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};