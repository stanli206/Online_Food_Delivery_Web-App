import {
  getCartByUser,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCartForUser,
} from "../services/cartService.js";

export const getMyCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await getCartByUser(userId);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

export const addToCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { restaurantId, menuItemId, quantity } = req.body;

    if (!restaurantId || !menuItemId) {
      return res
        .status(400)
        .json({ message: "restaurantId and menuItemId are required" });
    }

    const cart = await addItemToCart({
      userId,
      restaurantId,
      menuItemId,
      quantity: quantity || 1,
    });

    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

export const updateCartItemController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== "number") {
      return res.status(400).json({ message: "Quantity must be a number" });
    }

    const cart = await updateCartItemQuantity({ userId, itemId, quantity });

    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItemController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const cart = await removeItemFromCart({ userId, itemId });

    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

export const clearCartController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await clearCartForUser(userId);
    res.json({ message: "Cart cleared" });
  } catch (err) {
    next(err);
  }
};
