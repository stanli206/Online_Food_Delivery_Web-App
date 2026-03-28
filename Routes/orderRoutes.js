import express from "express";
import {
  createOrderController,
  getMyOrdersController,
  getOrderByIdController,
} from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(adminOnly);

router.post("/", createOrderController);

router.get("/my", getMyOrdersController);

router.get("/:id", getOrderByIdController);

export default router;
