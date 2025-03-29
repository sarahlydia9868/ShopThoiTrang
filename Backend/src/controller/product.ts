import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Product from "../model/product";
import cloudinary from "cloudinary";

// @desc    Lấy thông tin danh sách sản phẩm
// @route   GET /api/products
// @access  Public
export const getProductList = asyncHandler(async (req: Request, res: Response) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const queryCopy = { ...req.query };

  // Removing some field for category
  const removeFields = ["keyword", "page", "limit"];
  removeFields.forEach((key) => delete queryCopy[key]);

  const currentPage = Number(req.query.page) || 1;
  const skip = resultPerPage * (currentPage - 1);

  const products = await Product.find({ ...keyword }).find(queryCopy).limit(resultPerPage).skip(skip);
  res.status(200).json({
    success: true,
    data: products,
    productsCount,
    resultPerPage,
  });
});

// @desc    Lấy thông tin 1 sản phẩm
// @route   GET /api/products/:id
// @access  Public

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({
      message: "Lấy sẩn phẩm thành công",
      data: product,
    });
  } else {
    res.status(400).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// @desc    Tạo 1 sản phẩm
// @route   POST /api/products
// @access  Private/Admin

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product: ProductModel = req.body;

  const imagesLinks = [];

  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(product.images[i].url, {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  product.images = imagesLinks;
  const newProduct = await Product.create(product);
  res.status(201).json({
    success: true,
    message: "Đã thêm sản phẩm",
    data: newProduct,
  });
});

// @desc    Cập nhật sản phẩm
// @route   PUT /api/products/:id
// @access  Private/Admin

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product: ProductModel = req.body;

  const imagesLinks = [];

  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(product.images[i].url, {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  product.images = imagesLinks;
  const newProduct =  await Product.findByIdAndUpdate(product._id, product, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(201).json({
    success: true,
    message: "Đã cập nhật sản phẩm",
    data: newProduct,
  });
});

// @desc    Xoá 1 sản phẩm
// @route   DELETE /api/products/:id
// @access  Private/Admin

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = (await Product.findById(req.params.id)) as any;

  if (!product) {
    res.status(400).json("Không tìm thấy sản phẩm");
  } else {
    // Deleting images from cloudinary
    for (let i = 0; 1 < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: "Đã xoá sản phẩm",
    });
  }
});

// @desc    Tạo đánh giá
// @route   POST /api/products/:id/reviews
// @access  Private
export const createReview = asyncHandler(async (req: any, res: Response) => {
  const { comment, rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const exist = product.reviews.find((r: { user: { toString: () => any; }; }) => r.user.toString() === req.user._id.toString());
    if (exist) {
      res.status(400).json({ message: "Bạn đã đánh giá sản phẩm" });
    } else {
      const review = {
        name: req.user.name as string,
        rating,
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      await product.save();

      res.status(201).json(product.reviews);
    }
  } else {
    res.status(403).json({ message: "Không tìm thấy sản phẩm" });
  };
});

export default {
  getProductList,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
