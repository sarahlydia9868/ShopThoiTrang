import express from "express";
import orderController from "../controller/order";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router.route("/").get(auth, admin, orderController.getOrderList).post(auth, orderController.createOrder);
router.route("/orders-user/").post(auth, orderController.getUserOrder);
router.route("/get").post(auth, orderController.getOrderById);
router.route("/delete").post(auth, orderController.deleteOrder).put(auth, orderController.payOrder);

export default router;
