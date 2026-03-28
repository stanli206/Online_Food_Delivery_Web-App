import express from "express";
import {
  createRestaurantController,
  getRestaurantsController,
  getRestaurantByIdController,
  updateRestaurantController,
  deleteRestaurantController,
} from "../controllers/restaurantController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public list & detail
router.get("/", getRestaurantsController);
router.get("/:id", getRestaurantByIdController);

// Admin only
router.post("/", protect, adminOnly, createRestaurantController);
router.put("/:id", protect, adminOnly, updateRestaurantController);
router.delete("/:id", protect, adminOnly, deleteRestaurantController);

export default router;
