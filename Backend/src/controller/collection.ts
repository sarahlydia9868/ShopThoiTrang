import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Collection from "../model/collection";
import cloudinary from "cloudinary";

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

// @desc    Tạo bộ sư tập mới
// @route   Post /api/collections/new
// @access  Private

export const createCollection = asyncHandler(async (req: Request, res: Response) => {
  const { collection } = req.body;

  const imagesLinks = [];

  for (let i = 0; i < collection.images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(collection.images[i].url, {
      folder: "collections",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  collection.images = imagesLinks;

  const newCollection = await Collection.create(collection);
  if (newCollection) {
    res.status(201).json({
      message: "Đã thêm bộ sưu tập",
      data: newCollection,
    });
  } else {
    res.status(400).json({ message: "Không thành công" });
  }
});

// @desc    Xoá 1 bộ sưu tập
// @route   Post /api/collection/delete
// @access  Private/Admin

export const deleteCollection = asyncHandler(async (req: Request, res: Response) => {
  const collection = (await Collection.findById(req.body.id)) as CollectionModel;

  if (!collection) {
    res.status(400).json("Không tìm thấy bộ sưu tập");
  } else {
    // Deleting images from cloudinary
    for (let i = 0; i < collection.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(collection.images[i].public_id);
    }
    await Collection.findByIdAndDelete(req.body.id);
    res.status(200).json({
      message: "Đã xoá bộ sưu tập",
    });
  }
});

export default {
  getCollectionList,
  getCollectionById,
  createCollection,
  deleteCollection,
};
