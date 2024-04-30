//= =================================================================//
// Configuration of the MongoDB database for user credentials storage
//= =================================================================//

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.ENV === 'prod' ? process.env.DB_PROD : process.env.DB_DEV;

const mongodb = `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(
  process.env.DB_PASSWORD || '',
)}@poker-planning-app-clus.twypfcb.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=poker-planning-app-cluster`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb);
    console.log('\x1b[32mConnection to MongoDB established successfully'); // eslint-disable-line no-console
  } catch (err) {
    // Emit error message in case of connection failure
    console.error('\x1b[31mConnection to MongoDB failed'); // eslint-disable-line no-console
  }
};

export default connectDB;
