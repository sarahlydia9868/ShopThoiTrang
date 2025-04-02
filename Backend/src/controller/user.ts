import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../model/user";
import bcrypt from "bcryptjs";
import store2 from "store2";
import cloudinary from "cloudinary";
import generateToken from "../util/token";
import { sendMail } from "../util/mail";

// @desc    Đăng kí người dùng mới
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req: any, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || username.trim() === "") {
    res.status(422).json({ message: "Tên đăng nhập không được để trống" });
    return;
  }

  if (!email || email.trim() === "") {
    res.status(422).json({ message: "Email không được để trống" });
    return;
  }

  if (!email.includes("@")) {
    res.status(422).json({ message: "Địa chỉ email cần bao gồm @" });
    return;
  }

  if (!password || password.trim() === "") {
    res.status(422).json({ message: "Mật khẩu không được để trống" });
    return;
  }

  if (!/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(password)) {
    res.status(422).json({ message: "Mật khẩu không hợp lệ, phải chứa 8 kí tự bao gồm số và chữ cái" });
    return;
  }

  if (await User.findOne({ username })) {
    res.status(500).json({ message: "Tên đăng nhập đã được xử dụng" });
    return;
  }

  if (await User.findOne({ email })) {
    res.status(500).json({ message: "Email đã được xử dụng" });
    return;
  }

  const name = username;
  const address: ShippingAddress[] = [];
  const phoneNumber = null;
  const isAdmin = false;
  const avatarImage = {
    public_id: "profile",
    url: "/images/profile.png",
  };
  const cart: CartItem[] = [];
  const wishList: CartItem[] = [];
  const user = new User({
    username,
    password,
    isAdmin,
    avatarImage,
    name,
    email,
    address,
    phoneNumber,
    cart,
    wishList,
  });

  if (user) {
    const newUser = (await user.save()) as UserModel;
    const userPayLoad: UserPayLoad = {
      message: "Đăng kí thành công",
      data: {
        _id: newUser._id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        banned: newUser.banned,
        avatarImage: newUser.avatarImage,
        address: newUser.address,
        birthdate: newUser.birthdate,
        phoneNumber: newUser.phoneNumber,
        name: newUser.name,
        cartItems: newUser.cartItems,
        wishList: newUser.wishList,
      },
    };
    store2.set("token", generateToken(user._id));
    res.status(200).json(userPayLoad);
  } else {
    res.status(500).json({ message: "Đăng kí thất bại" });
  }
});

// @desc    Đăng nhập
// @route   POST /api/users/login
// @access  Public

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || username.trim() === "") {
    res.status(422).json({ message: "Tên đăng nhập không được để trống" });
    return;
  }

  if (!password || password.trim() === "") {
    res.status(422).json({ message: "Mật khẩu không được để trống" });
    return;
  }

  const user = (await User.findOne({ username }).select("+password")) as UserModel;

  if (user) {
    const match = await bcrypt.compare(password, user.password!);
    if (match) {
      if (user.banned) {
        res.status(400).json({ message: "Tài khoản bị cấm" });
      }
      const userPayLoad: UserPayLoad = {
        message: "Đăng nhập thành công",
        data: {
          _id: user._id,
          username: user.username,
          password: user.password,
          email: user.email,
          isAdmin: user.isAdmin,
          banned: user.banned,
          avatarImage: user.avatarImage,
          address: user.address,
          birthdate: user.birthdate,
          phoneNumber: user.phoneNumber,
          name: user.name,
          cartItems: user.cartItems,
          wishList: user.wishList,
        },
      };
      store2.set("token", generateToken(user._id));
      res.status(200).json(userPayLoad);
    } else {
      res.status(500).json({ message: "Sai mật khẩu" });
    }
  } else {
    res.status(500).json({ message: "Không tìm thấy tên đăng nhập" });
  }
});

// @desc    Đăng xuất người dùng
// @route   Get /api/users/logout
// @access  Admin

export const logout = asyncHandler(async (req: Request, res: Response) => {
  store2.remove("token");
  res.status(200).json({ message: "Đăng xuất thành công" });
});

// @desc    Lấy thông tin tất cả người dùng
// @route   Get /api/users/all-user
// @access  Admin

export const getUsersList = asyncHandler(async (req: Request, res: Response) => {
  const query: any = req.query.query ?? "";

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
  });
  if (users) {
    res.status(200).json({
      data: users,
      message: "Lấy danh sách người dùng thành công",
    });
  } else {
    res.status(400).json({ message: "Lỗi lấy danh sách người dùng" });
  }
});

// @desc    Lấy thông tin người dùng
// @route   Get /api/users/:id
// @access  Private

export const getUserBydId = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const userPayLoad: UserPayLoad = {
      message: undefined,
      data: {
        _id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        isAdmin: user.isAdmin,
        banned: user.banned,
        avatarImage: user.avatarImage,
        address: user.address,
        birthdate: user.birthdate,
        phoneNumber: user.phoneNumber,
        name: user.name,
        cartItems: user.cartItems,
        wishList: user.wishList,
      },
    };
    res.status(200).json(userPayLoad);
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy id",
    });
  }
});

// @desc    Thêm sản phẩm vào giỏ hàng hoặc wishlist
// @route   Put /api/users/update-item
// @access  Private

export const updateUserItems = asyncHandler(async (req: Request, res: Response) => {
  const { id, cartItems, wishList } = req.body;
  const user = await User.findById(id);
  if (user) {
    user.cartItems = cartItems;
    user.wishList = wishList;
    await user.save();
    res.status(200).json({ message: "Thành công" });
  } else {
    res.status(400).json({ message: "Không tìm thấy tài khoản" });
  }
});

// @desc    Cập nhật hồ sơ người dùng
// @route   Put /api/users/me/update
// @access  Private

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const newUserProfile: UserModel = req.body;
  const user = await User.findById(newUserProfile._id);
  try {
    if (user) {
      user.username = newUserProfile.username || user.username;
      user.email = newUserProfile.email || user.email;
      user.name = newUserProfile.name || user.name;
      user.phoneNumber = newUserProfile.phoneNumber || user.phoneNumber;
      user.address = newUserProfile.address || user.address;
      user.birthdate = newUserProfile.birthdate || user.birthdate;
      if (newUserProfile.avatarImage.url !== "" && (newUserProfile.avatarImage.url as string).startsWith("data:image")) {
        const imageId = user.avatarImage.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload_large(newUserProfile.avatarImage.url, {
          folder: "avatars",
          width: 500,
          height: 500,
          quality: 100,
          crop: "fill",
        });
        user.avatarImage = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      await user.save();
      res.status(200).json({ message: "Cập nhật nhật tài khoản thành công" });
    } else {
      res.status(400).json({ message: "Không tìm thấy tài khoản" });
    }
  } catch (ex) {
    res.status(400).json({ message: "Lỗi cập nhật tài khoản" });
  }
});

// @desc    Thay đổi quyền truy cập
// @route   Post /api/users/promote
// @access  Admin

export const promoteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const isAdmin = req.body.isAdmin;
    const banned = req.body.banned;
    const user = await User.findById(id);
    user.isAdmin = isAdmin;
    user.banned = banned;
    await user.save();
    res.status(200).json({
      message: "Thay đổi quyền truy cập thành công",
    });
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy id",
    });
  }
});

// @desc    Xoá tài khoản
// @route   Delete /api/users/:id
// @access  Admin

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.avatarImage.public_id !== "profile") {
      await cloudinary.v2.uploader.destroy(user.avatarImage.public_id);
    }
    await User.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: "Đã xoá tài khoản",
    });
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy id",
    });
  }
});

// @desc    Gửi code thay đổi mật khẩu
// @route   Post /api/users/send-code
// @access  Public

export const sendCodePassword = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const randomCode = Math.floor(100000 + Math.random() * 900000);

    await sendMail({
      email: user.email,
      subject: "Mã xác thực thay đổi mật khẩu",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 400px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; margin: 0 auto;">
            <p style="font-size: 18px;">Xin chào ${user.name},</p>
            <p style="font-size: 16px;">Đây là mã xác nhận bạn yêu cầu:</p>
            <p style="font-size: 28px; font-weight: bold; margin: 10px 0;">${randomCode}</p>
            <p style="font-size: 14px; color: #666;">Nếu bạn không yêu cầu điều này, bạn có thể bỏ qua email này hoặc cho chúng tôi biết.</p>
            <p style="margin-top: 30px;">Cảm ơn,</p>
            <p style="font-weight: bold;">Fashin Store</p>
        </div>
    </body>
    </html>`,
    });
    res.status(200).json({
      message: "Đã gửi mã xác thực đến email của bạn",
    });
    store2.set("code", randomCode, true);
  } catch (ex) {
    res.status(400).json({
      message: "Không tìm thấy tài khoản",
    });
  }
});

// @desc    Xác thực code
// @route   Post /api/users/verify-code
// @access  Public

export const verifyCode = asyncHandler(async (req: Request, res: Response) => {
  try {
    const code = req.body.code;
    if (Number(code) === store2.get("code")) {
      res.status(200).json({
        message: "Thành công",
      });
    } else {
      res.status(403).json({
        message: "Mã xác thực không đúng",
      });
    }
  } catch (ex) {
    res.status(400).json({
      message: "Lỗi",
    });
  }
});

// @desc    Xác thực code thay đổi mật khẩu
// @route   Post /api/users/verify-code-password
// @access  Public

export const verifyCodePassword = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(req.body.password)) {
      res.status(422).json({ message: "Mật khẩu không hợp lệ, phải chứa 8 kí tự bao gồm số và chữ cái" });
      return;
    }
    const code = req.body.code;
    if (Number(code) === store2.get("code")) {
      const user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      await user.save();
      store2.remove("code");
      res.status(200).json({
        message: "Thay đổi mật khẩu thành công",
      });
    } else {
      res.status(403).json({
        message: "Mã xác thực không đúng",
      });
    }
  } catch (ex) {
    res.status(400).json({
      message: "Lỗi",
    });
  }
});

export default {
  register,
  login,
  logout,
  getUsersList,
  getUserBydId,
  updateUserItems,
  updateUserProfile,
  promoteUser,
  deleteUser,
  sendCodePassword,
  verifyCode,
  verifyCodePassword,
};
