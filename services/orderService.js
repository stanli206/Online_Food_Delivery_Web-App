// services/orderService.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const ORDER_STATUSES = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

// Create order from current user's cart
export const createOrderFromCart = async ({
  userId,
  deliveryAddress,
  paymentMethod = "COD",
}) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || !cart.items || cart.items.length === 0) {
    const error = new Error("Cart is empty");
    error.statusCode = 400;
    throw error;
  }

  // Snapshot items from cart
  const items = cart.items.map((it) => ({
    menuItemId: it.menuItemId,
    name: it.name,
    price: it.price,
    quantity: it.quantity,
    image: it.image,
    isVeg: it.isVeg,
  }));

  const totalAmount = cart.subtotal;

  const order = await Order.create({
    userId,
    restaurantId: cart.restaurantId,
    items,
    deliveryAddress,
    paymentInfo: {
      method: paymentMethod,
      status: paymentMethod === "COD" ? "PENDING" : "PENDING", // later payment gateway-la update pannalaam
      transactionId: null,
    },
    status: "PLACED",
    totalAmount,
  });

  // Clear cart after order
  await Cart.deleteOne({ _id: cart._id });

  return order;
};

export const getUserOrders = async (userId) => {
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  return orders;
};

export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  return order;
};

// Admin: get all orders (optional filters later)
export const getAllOrders = async () => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("userId", "name email")
    .populate("restaurantId", "name");
  return orders;
};

export const updateOrderStatusService = async ({ orderId, status }) => {
  if (!ORDER_STATUSES.includes(status)) {
    const error = new Error("Invalid order status");
    error.statusCode = 400;
    throw error;
  }

  const order = await Order.findById(orderId);
  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    throw error;
  }

  order.status = status;
  await order.save();
  return order;
};
