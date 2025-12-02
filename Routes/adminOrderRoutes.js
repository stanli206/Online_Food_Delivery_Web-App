// routes/adminOrderRoutes.js
import express from "express";
import {
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import { ensureAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// all routes here admin-only
router.use(ensureAdmin);

// GET /api/admin/orders
router.get("/", getAllOrdersController);

// GET /api/admin/orders/:id   (re-use getOrderByIdController)
router.get("/:id", getOrderByIdController);

// PUT /api/admin/orders/:id/status
router.put("/:id/status", updateOrderStatusController);

export default router;
