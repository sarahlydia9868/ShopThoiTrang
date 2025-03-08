"use strict";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  Client = "Client",
  Staff = "Staff",
  Admin = "Admin",
}

const userSchema = new Schema<UserModel>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    role: {
      type: String,
      enum: UserRole,
      required: false,
      default: UserRole.Client,
    },
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
