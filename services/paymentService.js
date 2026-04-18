import stripe from "../utils/stripe.js";
import Cart from "../models/Cart.js";

export const createStripeSession = async ({
  userId,
  successUrl,
  cancelUrl,
}) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
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
      product_data: { name: "Delivery Fee" },
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

  return { session, cart };
};
