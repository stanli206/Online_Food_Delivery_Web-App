import express from "express";
import { adminOnly } from "../middlewares/authMiddleware.js";
import {
  createStripeSessionController,
  confirmStripeOrderController,
} from "../controllers/paymentController.js";

const router = express.Router();

router.use(adminOnly);

router.post("/stripe/create-session", createStripeSessionController);

router.post("/stripe/confirm-order", confirmStripeOrderController);

export default router;
