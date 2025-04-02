"use strict";
declare global {
  interface UserPayLoad {
    message?: string;
    data: UserModel;
  }

  interface Image {
    public_id: string;
    url: string;
  }

  interface ShippingAddress {
    name: string;
    phoneNumber: number;
    province: string;
    district: string;
    commune: string;
    specificAddress?: string;
  }

  // User
  interface UserModel {
    _id: Types.ObjectId;
    username: string;
    password?: string;
    name?: string;
    email: string;
    address?: ShippingAddress[];
    birthdate?: string;
    phoneNumber?: number;
    banned: boolean;
    isAdmin: boolean;
    avatarImage: Image;
    cartItems: CartItem[];
    wishList: CartItem[];
    banned?: boolean;
  }

  interface CartItem {
    _id: Types.ObjectId;
    name: string;
    price: number;
    image: string;
    color: string;
    size: string;
    qty: number;
  }

  // Order
  interface OrderModel {
    _id?: Types.ObjectId;
    user: Types.ObjectId;
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    totalPrice: number;
    isPaid: boolean;
    progress: string;
  }

  // Product

  interface Review {
    name: string;
    rating: number;
    comment: string;
    time?: Date;
    user: Types.ObjectId;
  }

  interface ProductModel {
    _id?: Types.ObjectId;
    name: string;
    description: string;
    collectionName?: string;
    price: number;
    offerPrice: number;
    color: string[];
    size: string[];
    images: Image[];
    ratings: number;
    category: string;
    qty: number;
    reviews: Review[];
    buyCount: number;
    createAt?: Date;
  }

  interface CollectionModel {
    _id?: Types.ObjectId;
    title: string;
    titleContent?: string;
    content: string;
    images: Image[];
    createdAt?: string;
  }
}

export {};

cartItems: [{
  name: string
}]