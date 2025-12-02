import express from "express";
import {
  createRestaurantController,
  getRestaurantsController,
  getRestaurantByIdController,
  updateRestaurantController,
  deleteRestaurantController,
} from "../controllers/restaurantController.js";
import { ensureAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public list & detail
router.get("/", getRestaurantsController);
router.get("/:id", getRestaurantByIdController);

// Admin only
router.post("/", ensureAdmin, createRestaurantController);
router.put("/:id", ensureAdmin, updateRestaurantController);
router.delete("/:id", ensureAdmin, deleteRestaurantController);

export default router;
