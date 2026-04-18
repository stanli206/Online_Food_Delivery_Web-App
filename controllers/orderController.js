import {
  createOrderFromCart,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatusService,
} from "../services/orderService.js";

export const createOrderController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { deliveryAddress, paymentMethod } = req.body;

    if (!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city) {
      return res.status(400).json({
        message: "deliveryAddress with at least street & city is required",
      });
    }

    const order = await createOrderFromCart({
      userId,
      deliveryAddress,
      paymentMethod: paymentMethod || "COD",
    });

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

export const getMyOrdersController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await getUserOrders(userId);
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

export const getOrderByIdController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === "admin";
    const { id } = req.params;

    const order = await getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!isAdmin && order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not allowed to view this order" });
    }

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

export const getAllOrdersController = async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await updateOrderStatusService({ orderId: id, status });

    res.json({ order });
  } catch (err) {
    next(err);
  }
};
