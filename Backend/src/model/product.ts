"use strict";
import { Schema, model } from "mongoose";

const reviewSchema = new Schema<Review>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const productSchema = new Schema<ProductModel>(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm"],
      trim: true,
      maxLength: [200, "Tên sản phẩm không vượt quá 200 kí tự"],
    },
    description: {
      type: String,
      required: [true, "Vui lòng thêm mô tả thông tin sản phẩm của bạn"],
      maxlength: [7000, "Mô tả không thể vượt quá 7000 kí tự"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    offerPrice: {
      type: Number,
    },
    qty: {
      type: Number,
      required: true,
      default: 0,
    },
    color: [
      {
        type: String,
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    collectionName: {
      type: String,
      required: false,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please add a category of your product"],
    },
    reviews: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
