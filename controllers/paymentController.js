import stripe from "../utils/stripe.js";
import Payment from "../models/Payment.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { createStripeSession } from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const successUrl = `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.CLIENT_URL}/payment-failed`;

    const { session, cart } = await createStripeSession({
      userId,
      successUrl,
      cancelUrl,
    });

    await Payment.create({
      user: userId,
      cart: cart._id,
      amount: cart.subtotal + 30,
      transactionId: session.id,
      status: "pending",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    const payment = await Payment.findOne({
      transactionId: session_id,
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status === "completed") {
      return res.json({ success: true });
    }

    const cart = await Cart.findById(payment.cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    payment.status = "completed";
    await payment.save();

    await Order.create({
      userId: payment.user,
      restaurantId: cart.restaurantId,
      items: cart.items,
      deliveryAddress: {},
      paymentInfo: {
        method: "STRIPE",
        status: "PAID",
        transactionId: session_id,
      },
      totalAmount: cart.subtotal,
      status: "CONFIRMED",
    });
    await Cart.deleteOne({ _id: cart._id });

    return res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};