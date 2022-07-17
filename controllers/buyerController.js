import Books from '../models/Books.js';
import FailureResponse, { fixedresponse } from '../utils/FailureResponse.js';
import {
  DATA_FETCHED,
  SUCCESS,
  ADDRESS,
  FAILURE,
  USER_NOT_FOUND,
  ADDRESS_ADDED,
  ORDER_PLACED,
  PAYMENT_CONFIRMED,
  ALL_ORDERS,
  HISTORY,
} from '../utils/Constants.js';
import User from '../models/User.js';
import Orders from '../models/Orders.js';
import BookCategories from '../models/BookCategories.js';

// @desc    Get All Books
// @route   GET /api/buyer/getAllBooks
// @access  Public
const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .populate({
        path: 'categoryId',
        select: '_id categoryName',
      })
      .populate({
        path: 'sellerId',
        select: '_id firstName lastName email',
      });

    res.status(201).json({
      status: SUCCESS,
      message: DATA_FETCHED,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Get Address of  Buyers
// @route   GET /api/buyer/getAddress
// @access  Public
const getAddress = async (req, res) => {
  try {
    const address = await User.findById(req.userId).select('address');
    console.log(address.address);
    res.status(201).json({
      status: SUCCESS,
      message: ADDRESS,
      data: {
        address: address.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Add Address of  Buyers
// @route   POST /api/buyer/addAddress
// @access  Public
const addAddress = async (req, res) => {
  try {
    const { address } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      const failureResponse = new FailureResponse(FAILURE, USER_NOT_FOUND, '');
      const response = failureResponse.response();
      return res.status(404).json(response);
    }

    user.address = address;

    const addr = await user.save();

    res.status(201).json({
      status: SUCCESS,
      message: ADDRESS_ADDED,
      data: {
        address: addr.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Get All Categories
// @route   GET /api/buyer/getAllCategories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await BookCategories.find();

    res.status(201).json({
      status: SUCCESS,
      message: DATA_FETCHED,
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Get All Orders of a Current User
// @route   GET /api/buyer/getAllOrder
// @access  Private
const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({
      $and: [
        {
          buyer: req.userId,
        },
        {
          $or: [
            {
              status: 'Order Placed',
            },
            {
              $or: [
                {
                  status: 'Order Confirmed',
                },
                { status: 'Out For Delivery' },
              ],
            },
          ],
        },
      ],
    })
      .populate({
        path: 'seller',
        select: '_id firstName lastName email',
      })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'book',
        },
      });

    res.status(201).json({
      status: SUCCESS,
      message: ALL_ORDERS,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Something Bad Happened' });
  }
};

// @desc    Get All History of a Current User
// @route   GET /api/buyer/getHistory
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await Orders.find({
      $and: [
        {
          buyer: req.userId,
        },
        { status: 'Delivered' },
      ],
    })
      .populate({
        path: 'seller',
        select: '_id firstName lastName email',
      })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'book',
        },
      });

    res.status(201).json({
      status: SUCCESS,
      message: HISTORY,
      data: history,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Checkout
// @route   POST /api/buyer/checkout
// @access  Private
const placeOrder = async (req, res) => {
  try {
    const { seller, orderItems, address, totalPrice, paymentMode } = req.body;

    const order = await Orders.create({
      buyer: req.userId,
      seller: seller,
      address: address,
      totalPrice: totalPrice,
      orderItems: orderItems,
      paymentMode: paymentMode,
    });

    res.status(201).json({
      status: SUCCESS,
      message: ORDER_PLACED,
      data: {
        order: order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

// @desc    Checkout
// @route   PATCH /api/buyer/updatePaymentStatus
// @access  Private

const updatePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Orders.findById(orderId);

    order.isPaid = true;

    await order.save();

    res.status(201).json({
      status: SUCCESS,
      message: PAYMENT_CONFIRMED,
      data: {
        order: order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(fixedresponse);
  }
};

export {
  getAllBooks,
  getAllOrders,
  getHistory,
  placeOrder,
  getAddress,
  addAddress,
  updatePayment,
};
