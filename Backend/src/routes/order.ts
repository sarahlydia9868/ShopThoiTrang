import express from "express";
import orderController from "../controller/order";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router.route("/").get(auth, admin, orderController.getOrderList);
router.route("/create-order").post(auth, orderController.createOrder);
router.route("/orders-user").post(auth, orderController.getUserOrder);
router.route("/get").post(auth, orderController.getOrderById);
router.route("/delete").post(auth, orderController.deleteOrder);
router.route("/update-progress").post(auth, orderController.updateProgressOrder);

export default router;
