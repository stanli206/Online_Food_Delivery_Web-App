// routes/orderRoutes.js
import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
} from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(adminOnly);

// create order from cart
router.post("/", createOrderController);

// get my orders
router.get("/my", getMyOrdersController);

// get specific order (only if own)
router.get("/:id", getOrderByIdController);

export default router;
