import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import sanitizedConfig from "../util/config";
import store2 from "store2";
import User from "../model/user";

export interface RequestWithUser extends Request {
  user: UserModel;
}

export interface DataStoredInToken {
  id: string;
}

export const auth = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
 // const token = store2.get("token");
 const {token} = await req.cookies;
  if (!token) {
    res.status(401).json({ message: "Không có token" });
  } else {
    try {
      const decoded = jwt.verify(token, sanitizedConfig.JWT_SECRET) as DataStoredInToken;
      req.params = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Lỗi token" });
    }
  }
});

export const admin = asyncHandler(async (req: RequestWithUser | any, res: Response, next: NextFunction) => {
  const user = await User.findById(req.params.id);
  if (user&& user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Không phải admin" });
  }
});

export default {
  auth,
  admin,
};
