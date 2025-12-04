// routes/paymentRoutes.js
import express from "express";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
import {
  createStripeSessionController,
  confirmStripeOrderController,
} from "../controllers/paymentController.js";

const router = express.Router();

// All payment routes need login
router.use(ensureAuthenticated);

// POST /api/payments/stripe/create-session
router.post("/stripe/create-session", createStripeSessionController);

// POST /api/payments/stripe/confirm-order
router.post("/stripe/confirm-order", confirmStripeOrderController);

export default router;
