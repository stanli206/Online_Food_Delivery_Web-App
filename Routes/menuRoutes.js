import express from "express";
import {
  createMenuItemController,
  getMenuByRestaurantController,
  updateMenuItemController,
  deleteMenuItemController,
} from "../controllers/menuController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:restaurantId", getMenuByRestaurantController);

router.post("/:restaurantId",protect, adminOnly, createMenuItemController);
router.put("/item/:id",protect, adminOnly, updateMenuItemController);
router.delete("/item/:id",protect, adminOnly, deleteMenuItemController);

export default router;
