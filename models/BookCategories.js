import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookCategories = mongoose.model('categories', CategoriesSchema);

export default BookCategories;
