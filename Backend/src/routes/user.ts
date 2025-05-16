import express from "express";
import userController from "../controller/user";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router.route("/check-register").post(userController.checkRegister);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);
//router.route("/set-token/:id").get(userController.setToken);
router.route("/promote").post(auth, admin, userController.promoteUser);
router.route("/send-code").post(userController.sendCodePassword);
router.route("/verify-code").post(userController.verifyCode);
router.route("/verify-code-password").post(userController.verifyCodePassword);
router.route("/me").get(auth, userController.getUserBydId);
router.route("/me/update").put(auth, userController.updateUserProfile);
router.route("/me/update-item").put(auth, userController.updateUserItems);
router.route("/all-user").get(auth, admin, userController.getUsersList);
router.route("/user/delete").post(auth, admin, userController.deleteUser)
router.route("/user/:id").get(userController.getUserBydId)

export default router;
