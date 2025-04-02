import express from "express";
import collectionController from "../controller/collection";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router.route("/").get(collectionController.getCollectionList);
router.route("/:id").get(collectionController.getCollectionById);
router.route("/delete").post(auth, admin, collectionController.deleteCollection);
router.route("/new").post(auth, admin, collectionController.createCollection);

export default router;
