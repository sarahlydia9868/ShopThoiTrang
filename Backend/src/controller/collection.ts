import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Collection from "../model/collection";

// @desc    Lấy thông tin tất cả bộ sưu tập
// @route   Get /api/collections/
// @access  Admin

export const getCollectionList = asyncHandler(async (req: Request, res: Response) => {
  const collections = await Collection.find({}).sort("-createdAt");

  if (collections) {
    res.status(200).json({
      message: "Đã lấy bộ sưu tập",
      data: collections,
    });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Lấy bộ sưu tập theo id
// @route   Get /api/collections/:id
// @access  Private

export const getCollectionById = asyncHandler(async (req: Request, res: Response) => {
  const collection = await Collection.findById(req.params.id);
  if (collection) {
    res.status(200).json({
      message: "Đã lấy bộ sưu tập",
      data: collection,
    });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

export default {
  getCollectionList,
  getCollectionById,
};
