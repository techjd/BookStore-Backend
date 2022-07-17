import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import authRouter from './routes/authRoutes.js';
import sellerRoutes from './routes/SellerRoutes.js';
import buyerRoutes from './routes/BuyerRoutes.js';
import connectDB from './config/db.js';
const app = express();

config();
app.use(json());
app.use(urlencoded({ extended: true }));

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/seller', sellerRoutes);
app.use('/api/buyer', buyerRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server Successfully Running on PORT ${process.env.PORT}`);
});
