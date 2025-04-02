import express from "express";
import productController from "../controller/product";
import { admin, auth } from "../middleware/auth";
const router = express.Router();

router.route("/").get(productController.getProductList);
router.route("/:id/reviews").post(auth, productController.createReview);
router.route("/:id").get(productController.getProductById).put(auth, admin, productController.updateProduct);
router.route("/new").post(auth, admin, productController.createProduct);
router.route("/delete").post(auth, admin, productController.deleteProduct);

export default router;
