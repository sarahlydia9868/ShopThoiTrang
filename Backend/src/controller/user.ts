import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { UserRole } from "../model/user";
import bcrypt from "bcryptjs";
import generateToken from "../util/token";

// @desc    Đăng kí người dùng mới
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req: any, res: Response) => {
  const { username, email, password } = req.query;
  if (
    !email ||
    !email.includes("@") ||
    !username ||
    username.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    res.status(422).json({ message: "Lỗi đầu vào." });
    return;
  }
  const exist = await User.findOne({ username });
  if (exist) {
    res.status(422).json({ message: "Tên đăng nhập đã được xử dụng" });
    return;
  }
  const firstName = username;
  const lastName = null;
  const address = null;
  const phoneNumber = null;
  const role = UserRole.Client;
  const user = new User({
    username,
    password,
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    role,
  });

  if (user) {
    const newUser = await user.save();
    res.status(201).json({
      message: "Đăng kí thành công",
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(user?._id),
    });
  } else {
    res.status(500);
    throw new Error("Lỗi đăng kí");
  }
});

// @desc    Đăng nhập
// @route   POST /api/users/login
// @access  Public

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.query as any;

  if (
    !username ||
    username.trim() == "" ||
    !password ||
    password.trim() === ""
  ) {
    res.status(422).json({ message: "Lỗi đầu vào." });
    return;
  }

  const user = await User.findOne({ username });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.status(200).json({
        message: "Đăng nhập thành công",
        _id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user?._id),
      });
    } else {
      res.status(500).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }
  } else {
    res.status(500).json({ message: "Không tìm thấy tên đăng nhập" });
  }
});

// @desc    Lấy thông tin tất cả người dùng
// @route   Get /api/users
// @access  Admin

export const getUsersList = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = 10;
    const page: any = req.query.page || 1;
    const query: any = req.query.query || "";

    const queryFilter =
      query && query !== "all"
        ? {
            username: {
              $regex: query,
              $options: "i",
            },
          }
        : {};

    const users = await User.find({
      ...queryFilter,
    })
      .skip(pageSize * (page - 1))
      .sort("-createdAt")
      .limit(pageSize)
      .lean();

    const countUsers = await User.countDocuments({
      ...queryFilter,
    });

    const pages = Math.ceil(countUsers / pageSize);

    if (users) {
      res.status(200).json({
        countUsers,
        users,
        page,
        pages,
      });
    } else {
      res.status(500);
      throw new Error("Not Found!");
    }
  }
);

// @desc    Lấy thông tin người dùng
// @route   Get /api/users/:id
// @access  Private

export const getUserBydId = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (ex) {
      res.status(400).json({
        message: "Không tìm thấy id",
      });
    }
  }
);

// @desc    Cập nhật hồ sơ người dùng
// @route   Put /api/users/:id
// @access  Private

export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
    } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.address = address || user.address;
      if (password) user.password = password;
      await user.save();
      res.status(200).json("Tài khoản đã được cập nhật");
    } else {
      res.status(400);
      throw new Error("Not Found!");
    }
  }
);

// @desc    Đặt quyền truy cập admin
// @route   Post /api/users/promote/:id
// @access  Admin

export const promoteAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      user.role = UserRole.Admin;
      res.status(200).json({
        message: "Đặt quyền truy cập admin thành công" 
      });
    } catch (ex) {
      res.status(400).json({
        message: "Không tìm thấy id",
      });
    }
  }
);

// @desc    Xoá tài khoản
// @route   Delete /api/users/:id
// @access  Admin

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    res.status(200).json({
      message: "Đã xoá tài khoản",
    });
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy id",
    });
  }
});

export default {
  register,
  login,
  getUsersList,
  getUserBydId,
  updateUserProfile,
  promoteAdmin,
  deleteUser,
};
