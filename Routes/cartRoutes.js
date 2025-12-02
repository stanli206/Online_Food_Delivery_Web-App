import express from "express";
import {
  getMyCart,
  addToCartController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
} from "../controllers/cartController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.use(ensureAuthenticated);

router.get("/", getMyCart);

router.post("/add", addToCartController);


router.put("/item/:itemId", updateCartItemController);


router.delete("/item/:itemId", removeCartItemController);


router.delete("/clear", clearCartController);

export default router;