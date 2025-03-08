import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import User, { UserRole } from "../model/user";
import sanitizedConfig from "../util/config";

export interface RequestWithUser extends Request {
  user: UserModel;
}

export interface DataStoredInToken {
  id: string;
}

export const auth = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    let token;
    if (authorization && authorization.startsWith("Bearer")) {
      try {
        token = authorization.split(" ")[1];

        const decoded = jwt.verify(
          token,
          sanitizedConfig.JWT_SECRET
        ) as DataStoredInToken;
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Lỗi token");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Không có token");
    }
  }
);

export const admin = asyncHandler(
  async (req: RequestWithUser | any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role == UserRole.Admin) {
      next();
    } else {
      res.status(401);
      throw new Error("Không phải admin");
    }
  }
);

export default {
  auth,
  admin,
};
