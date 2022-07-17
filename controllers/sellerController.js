import User from '../models/User.js';
import Books from '../models/Books.js';
import FailureResponse from '../utils/FailureResponse.js';
import { BOOK_ADDED, SUCCESS } from '../utils/Constants.js';

// @desc    Add A Book
// @route   POST /api/seller/addBook
// @access  Private
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      imageUrl,
      categoryId,
      price,
      sellerId,
    } = req.body;

    const book = await Books.create({
      title: title,
      author: author,
      description: description,
      imageUrl: imageUrl,
      categoryId: categoryId,
      price: price,
      sellerId: sellerId,
    });

    res.status(201).json({
      status: SUCCESS,
      message: BOOK_ADDED,
      data: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Delete A Book
// @route   POST /api/seller/deleteBook/:id
// @access  Private
const deleteBook = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

// @desc    Edit A Book
// @route   POST /api/seller/editBook/:id
// @access  Private
const editBook = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

// @desc    Receive New Orders
// @route   POST /api/seller/orders
// @access  Private
const getAllOrders = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

// @desc    Get a Specific Order By Id
// @route   GET /api/seller/orders
// @access  Private
const getSpecificOrder = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

// @desc    History Of Orders
// @route   POST /api/seller/history
// @access  Private
const getAllHistory = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

export { addBook, deleteBook, editBook, getAllOrders, getAllHistory };
