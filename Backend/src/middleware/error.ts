import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import config from "../util/config";

export function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err: any, req: Request, res: Response) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: config.NODE_ENV === "production" ? null : err.stack,
  });
}

export default {
  notFound,
  errorHandler,
};
