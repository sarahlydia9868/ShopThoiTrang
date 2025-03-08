import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Product from "../model/product";

// @desc    Lấy thông tin 12 sản phẩm 
// @route   GET /api/products
// @access  Public
export const getProductList = asyncHandler(
    async (req: Request, res: Response) => {
        const products = await Product.find({}).sort("-createdAt").limit(12);

        if (products) {
            res.status(200).json(products);
        } else {
            res.status(500);
            throw new Error("Không tìm thấy sản phẩm");
        }
    }
);

// @desc    Lấy thông tin 1 sản phẩm
// @route   GET /api/products/:id
// @access  Public

export const getProductById = asyncHandler(
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(400);
            throw new Error("Không tìm thấy sản phẩm");
        }
    }
);

// @desc   Láy thông tin sản phẩm theo khoá tìm kiếm
// @route   GET /api/products/search
// @access  Public

export const getProductSearch = asyncHandler(
    async (req: Request, res: Response) => {
        const pageSize: any = req.query.pageSize || 9;
        const page: any = req.query.page || 1;

        const category = req.query.category || "";
        const brand = req.query.brand || "";
        const searchQuery = req.query.query || "";

        const queryFilter =
            searchQuery && searchQuery !== "all"
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                }
                : {};
        const categoryFilter = category && category !== "all" ? { category } : {};
        const brandFilter = brand && brand !== "all" ? { brand } : {};

        const categories = await Product.find({}).distinct("category");
        const brands = await Product.find({}).distinct("brand");
        const productDocs = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...brandFilter,
        })
            .skip(pageSize * (page - 1))
            .limit(pageSize)
            .lean();

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...brandFilter,
        });

        res.status(200).json({
            countProducts,
            productDocs,
            categories,
            brands,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    }
);


// @desc    Tạo 1 sản phẩm
// @route   POST /api/products
// @access  Private/Admin

export const createProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { name, image, description, brand, category, price, qty } = req.body;

        try {
            const product = new Product({
                name,
                image,
                description,
                brand,
                category,
                price,
                qty,
            });

            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (error: any) {
            if (error.code === 11000) {
                // Handle duplicate key error
                res.status(400).json({ message: 'Sản phẩm đã tồn tại' });
            } else {
                res.status(500).json({ message: 'Lỗi tạo sản phẩm' });
            }
        }
    }
);

// @desc    Cập nhật sản phẩm
// @route   PUT /api/products/:id
// @access  Private/Admin

export const updateProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        if (product) {
            res.status(200).json('Sản phẩm đã được thêm');
        } else {
            res.status(400);
            throw new Error('Lỗi thêm sản phẩm');
        }
    }
);

// @desc    Xoá 1 sản phẩm
// @route   DELETE /api/products/:id
// @access  Private/Admin

export const deleteProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const product = await Product.findById(req.params.id) as any;

        if (product) {
            await product.remove();
            res.status(200).json("Sản phẩm đã được xoá");
        } else {
            res.status(400);
            throw new Error("Lỗi xoá sản phẩm'");
        }
    }
);

// @desc    Tạo đánh giá
// @route   POST /api/products/:id/reviews
// @access  Private
export const createReview = asyncHandler(async (req: any, res: Response) => {
    const { comment, rating } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const exist = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (exist) {
            res.status(400).json({ message: 'Bạn đã đánh giá sản phẩm' });
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
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm');
    }
});

export default {
    getProductList,
    getProductById,
    getProductSearch,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview
}