import express from 'express';
import { addBook } from '../controllers/sellerController.js';
const sellerRoutes = express.Router();

sellerRoutes.post('/addBook', addBook);

export default sellerRoutes;
