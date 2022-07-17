import { config } from 'dotenv';
import connectDB from './config/db.js';
import Categories from './data/Categories.js';
import BookCategories from './models/BookCategories.js';
import BooksData from './data/Books.js';
import Books from './models/Books.js';
// Load env vars
config();

// Connect DB
connectDB();

// Import into DB
const importData = async () => {
  try {
    // await BookCategories.insertMany(Categories);
    // await Books.insertMany(BooksData);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await BookCategories.deleteMany();
    // console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
