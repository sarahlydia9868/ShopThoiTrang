"use strict";
import jwt from "jsonwebtoken";
import config from "./config";

function generateToken(id: string) {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
}

/*
function sendToken(payload: UserPayLoad, statusCode: number, res: Response) {
  const token = generateToken(payload.data._id);
  const options: CookieOptions = {
    expires: new Date(
      Date.now() + 5 + 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json(payload);
}*/

export default generateToken;
