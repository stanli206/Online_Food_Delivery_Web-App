// services/paymentService.js
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Cart from "../models/Cart.js";

const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  throw new Error("STRIPE_SECRET_KEY is missing in .env file");
}

const stripe = new Stripe(stripeKey);

export const createStripeCheckoutSession = async ({
  userId,
  successUrl,
  cancelUrl,
}) => {
  const cart = await Cart.findOne({ userId }).populate("restaurantId");
  if (!cart || !cart.items || cart.items.length === 0) {
    const error = new Error("Cart is empty");
    error.statusCode = 400;
    throw error;
  }

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  lineItems.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Fee",
      },
      unit_amount: 30 * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId: userId.toString(),
      cartId: cart._id.toString(),
      restaurantId: cart.restaurantId.toString(),
    },
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
};
