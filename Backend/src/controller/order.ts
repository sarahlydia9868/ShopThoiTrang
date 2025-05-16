import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../model/order";
import { sendMail } from "../util/mail";
import User from "../model/user";

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

// @desc    Gửi mail trạng thái đơn hàng
// @route   POST /api/orders/send-mail
// @access  Admin

export const sendOrderMail = asyncHandler(async (req: any, res: Response) => {
  try {

    const {userID, title, content } = req.body;

    const user = await User.findById(userID);


    const htmlContent = content
  .replace(
    /#(\w+)/g,
    '<span style="color:#f56565;font-weight:500">#$1</span>'
  )
  .replace(/\n/g, '<br/>');

const emailTemplate = `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mail</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 400px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; margin: 0 auto;">
            <p style="font-size: 18px;">Xin chào ${user.name},</p>
            <p style="font-size: 14px;">${htmlContent}</p>
            <p style="margin-top: 30px;">Cảm ơn,</p>
            <p style="font-weight: bold;">Fashin Store</p>
        </div>
    </body>
    </html>`;

    await sendMail({
      email: user.email,
      subject: `${title}`,
      html: emailTemplate,
    });
    res.status(200).json({
      message: "Đã gửi thông tin đến email của bạn",
    });
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy tài khoản",
    });
  }
});


export default {
  getOrderList,
  getUserOrder,
  payOrder,
  getOrderById,
  deleteOrder,
  createOrder,
  updateProgressOrder,
  sendOrderMail
};
