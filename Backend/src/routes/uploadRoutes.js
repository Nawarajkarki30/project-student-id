import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  upload.single("image"),
  uploadImage
);

export default router;