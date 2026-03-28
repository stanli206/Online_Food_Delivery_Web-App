import express from "express";
import {
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.use(adminOnly);

router.get("/", getAllOrdersController);

router.get("/:id", getOrderByIdController);

router.put("/:id/status", updateOrderStatusController);

export default router;
