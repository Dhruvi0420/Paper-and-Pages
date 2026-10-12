import mongoose from 'mongoose';

/**
 * Mongoose Schema for Bookstore Orders
 */
export const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
    },
    fullAddress: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: [],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalItems: {
      type: Number,
      default: 1,
    },
    date: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
