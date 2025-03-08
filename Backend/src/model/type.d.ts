"use strict";
declare global {

  // User
  interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    role: UserRole;
  }

  interface CartItem {
    name: string;
    qty: number;
    image: string;
    _id: Types.ObjectId;
  }

  interface AddressType {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }

  // Order
  interface OrderModel {
    user: Types.ObjectId;
    cartItems: CartItem[];
    shippingAddress: AddressType;
    totalPrice: number;
    isPaid: boolean;
  }

  // Product

  interface Review {
    name: string;
    rating: number;
    comment: string;
    user: Types.ObjectId;
  }

  interface ProductModel {
    name: string;
    image: string;
    price: number;
    category: string;
    brand: string;
    description: string;
    qty?: number;
    reviews: Review[];
  }
}

export {};
