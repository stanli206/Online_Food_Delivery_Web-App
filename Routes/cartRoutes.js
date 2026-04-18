import express from "express";
import {
  getMyCart,
  addToCartController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", protect, getMyCart);

router.post("/add", protect, addToCartController);

router.put("/item/:itemId", protect, updateCartItemController);

router.delete("/item/:itemId", protect, removeCartItemController);

router.delete("/clear", protect, clearCartController);

export default router;
