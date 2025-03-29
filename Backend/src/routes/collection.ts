import express from "express";
import collectionController from "../controller/collection";
import { admin, auth } from "../middleware/auth";

const router = express.Router();

router.route("/").get(auth, admin, collectionController.getCollectionList);
router.route("/:id").get(auth, collectionController.getCollectionById);

export default router;
