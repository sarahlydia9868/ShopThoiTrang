"use strict";
import { Schema, model } from "mongoose";

const orderSchema = new Schema<OrderModel>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    cartItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        size: { type: String, required: true },
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    progress: { type: String, required: true, default: "Đang giao hàng" },
    shippingAddress: {
      name: { type: String, required: true },
      phoneNumber: { type: Number, required: true },
      province: { type: String, required: true },
      district: { type: String, required: true },
      commune: { type: String, required: true },
      specificAddress: { type: String, required: false },
    },
    shippingMethod: { type: Number, required: false },
    paymentURL: { type: String, required: false },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = model<OrderModel>("Order", orderSchema);

export default Order;
