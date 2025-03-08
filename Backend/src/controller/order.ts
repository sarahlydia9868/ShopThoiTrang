import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../model/order";

// @desc    Lấy thông tin tất cả đơn hàng
// @route   Get /api/orders
// @access  Admin

export const getOrderList = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({}).sort("-createdAt");

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400);
      throw new Error("Not Found!");
    }
  }
);

// @desc    Lấy thông tin đơn hàng
// @route   Get /api/orders/orders-user
// @access  Private

export const getUserOrder = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Not Found!");
  }
});

// @desc    Thanh toán đơn hàng
// @route   Put /api/orders/:id
// @access  Private

export const payOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Not Found!");
  }
});

// @desc    Lấy thông tin đơn hàng theo id
// @route   GET /api/orders/:id
// @access  Private

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400);
      throw new Error("Not Found!");
    }
  }
);

// @desc    Xoá đơn hàng
// @route   Delete /api/orders/:id
// @access  Private

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id) as any;

  if (order) {
    await order.remove();
    res.status(200).json("Đơn hàng đã bị xoá");
  } else {
    res.status(400);
    throw new Error("Not Found!");
  }
});

// @desc    Tạo 1 đơn hàng
// @route   POST /api/orders
// @access  Private

export const createOrder = asyncHandler(async (req: any, res: Response) => {
  const { cartItems, shippingAddress, totalPrice } = req.body;

  const order = new Order({
    cartItems,
    shippingAddress,
    totalPrice,
    user: req.user._id,
  });

  if (cartItems.length === 0) {
    res.status(400);
    throw new Error("Không có đơn hàng");
  }

  if (order) {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } else {
    res.status(400);
    throw new Error("Not Found!");
  }
});

export default {
    getOrderList,
    getUserOrder,
    payOrder,
    getOrderById,
    deleteOrder,
    createOrder
}