import express from "express";
import orderController from "../controller/order";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router
  .route("/")
  .get(auth, admin, orderController.getOrderList)
  .post(auth, orderController.createOrder);
router.route("/orders-user").get(auth, orderController.getUserOrder);
router
  .route("/:id")
  .get(auth, orderController.getOrderById)
  .delete(auth, orderController.deleteOrder)
  .put(auth, orderController.payOrder);

export default router;
