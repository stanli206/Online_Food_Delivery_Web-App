import express from "express";
import {
  createMenuItemController,
  getMenuByRestaurantController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../controllers/menuController.js";
import { ensureAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:restaurantId", getMenuByRestaurantController);

router.post("/:restaurantId", ensureAdmin, createMenuItemController);
router.put("/item/:id", ensureAdmin, updateMenuItemController);
router.delete("/item/:id", ensureAdmin, deleteMenuItemController);

export default router;
