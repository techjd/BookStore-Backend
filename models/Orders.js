import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    orderItems: [
      {
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'books',
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    status: {
      type: String,
      enum: [
        'Order Placed',
        'Order Confirmed',
        'Out For Delivery',
        'Delivered',
      ],
      required: false,
      default: 'Order Placed',
    },
    paymentMode: {
      type: String,
      enum: ['online', 'cod'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model('orders', OrderSchema);

export default Orders;
