// controllers/paymentController.js
import { createStripeCheckoutSession } from "../services/paymentService.js";
import { createOrderFromCart } from "../services/orderService.js";

export const createStripeSessionController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const successUrl = `${process.env.CLIENT_URL}/payment-success`;
    const cancelUrl = `${process.env.CLIENT_URL}/checkout`;

    const session = await createStripeCheckoutSession({
      userId,
      successUrl,
      cancelUrl,
    });

    return res.status(200).json({
      sessionId: session.sessionId,
      url: session.url,
    });
  } catch (err) {
    next(err);
  }
};

export const confirmStripeOrderController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { deliveryAddress } = req.body;

    const order = await createOrderFromCart({
      userId,
      deliveryAddress,
      paymentMethod: "STRIPE",
    });

    order.paymentInfo.status = "PAID";
    await order.save();

    return res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
