import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../model/order";

// @desc    Lấy thông tin tất cả đơn hàng
// @route   Get /api/orders
// @access  Admin

export const getOrderList = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({}).sort("-createdAt");

  if (orders) {
    res.status(200).json({
      message: "Đã lấy đơn hàng",
      data: orders,
    });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Lấy thông tin đơn hàng
// @route   Post /api/orders/orders-user
// @access  Private

export const getUserOrder = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.body.id }).sort("-createdAt");
  if (orders) {
    res.status(200).json({
      message: "Đã lấy đơn hàng",
      data: orders,
    });
  } else {
    res.status(400).json({ message: "Không tìm thấy đơn hàng" });
  }
});

// @desc    Thanh toán đơn hàng
// @route   Put /api/orders/:id
// @access  Private

export const payOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    order.isPaid = true;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Lấy thông tin đơn hàng theo id
// @route   Post /api/orders/get
// @access  Private

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.body.id);
  if (order) {
    res.status(200).json({
      message: "Đã lấy đơn hàng",
      data: order,
    });
  } else {
    res.status(400).json({ message: "Không tìm thấy đơn hàng" });
  }
});

// @desc    Thay đổi tiến trình đơn hàng
// @route   Post /api/orders/update-progress
// @access  Private

export const updateProgressOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    order.progress = req.body.progress;
    await order.save();
    res.status(200).json({ message: "Thành công" });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Xoá đơn hàng
// @route   Post /api/orders/delete
// @access  Private

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    await Order.findByIdAndDelete(order);
    res.status(200).json({ message: "Đơn hàng đã xoá" });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Tạo 1 đơn hàng
// @route   POST /api/orders/
// @access  Private

export const createOrder = asyncHandler(async (req: any, res: Response) => {
  const { cartItems, shippingAddress, totalPrice, id } = req.body;

  const order = new Order({
    cartItems,
    shippingAddress,
    totalPrice,
    user: id,
    progress: "Chờ xác nhận",
  });

  if (cartItems.length === 0) {
    res.status(400).json({
      message: "Không có đơn hàng",
    });
  }

  if (order) {
    const newOrder = await order.save();
    res.status(201).json({
      message: "Đã tạo đơn hàng",
      data: newOrder,
    });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

export default {
  getOrderList,
  getUserOrder,
  payOrder,
  getOrderById,
  deleteOrder,
  createOrder,
  updateProgressOrder
};
