// routes/menuRoutes.js
import express from "express";
import {
  createMenuItemController,
  getMenuByRestaurantController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../controllers/menuController.js";
import { ensureAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public - get menu of restaurant
router.get("/:restaurantId", getMenuByRestaurantController);

// Admin - manage menu for a restaurant
router.post("/:restaurantId", ensureAdmin, createMenuItemController);
router.put("/item/:id", ensureAdmin, updateMenuItemController);
router.delete("/item/:id", ensureAdmin, deleteMenuItemController);

export default router;
