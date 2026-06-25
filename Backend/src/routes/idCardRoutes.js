import express from "express";
import {
  createIdCard,
  getAllIdCards,
  getIdCardById,
  updateIdCard,
  deleteIdCard,
  getMyIdCard,
} from "../controllers/idCardController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student route — must come before "/:id" so "me" isn't treated as an ObjectId
router.get("/me", protect, authorizeRoles("student"), getMyIdCard);

// Admin routes
router.post("/", protect, authorizeRoles("admin"), createIdCard);
router.get("/", protect, authorizeRoles("admin"), getAllIdCards);
router.get("/:id", protect, authorizeRoles("admin"), getIdCardById);
router.put("/:id", protect, authorizeRoles("admin"), updateIdCard);
router.delete("/:id", protect, authorizeRoles("admin"), deleteIdCard);

export default router;