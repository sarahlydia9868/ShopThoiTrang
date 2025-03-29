"use strict";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema<UserModel>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    avatarImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    cartItems: [{
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
    }],
    wishList: [{
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
    }],
    name: { type: String, required: false },
    email: { type: String, required: false },
    address: [
      {
        name: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        province: { type: String, required: true },
        district: { type: String, required: true },
        commune: { type: String, required: true },
        specificAddress: { type: String, required: false },
      },
    ],
    phoneNumber: { type: String, required: false },
    birthdate: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<UserModel>("User", userSchema);

export default User;
