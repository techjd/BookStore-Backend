import express from 'express';
import {
  getAllBooks,
  getAddress,
  addAddress,
  placeOrder,
  updatePayment,
  getAllOrders,
  getHistory,
} from '../controllers/buyerController.js';
import protect from '../middlewares/auth.js';
const buyerRoutes = express.Router();

buyerRoutes.get('/books', getAllBooks);

buyerRoutes.get('/getAddress', protect, getAddress);

buyerRoutes.post('/addAddress', protect, addAddress);

buyerRoutes.post('/placeOrder', protect, placeOrder);

buyerRoutes.get('/getAllOrders', protect, getAllOrders);

buyerRoutes.get('/getHistory', protect, getHistory);

buyerRoutes.patch('/updatePaymentStatus', protect, updatePayment);
export default buyerRoutes;
