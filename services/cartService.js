import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";

const recalculateSubtotal = (cart) => {
  cart.subtotal = cart.items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return cart.subtotal;
};

export const getCartByUser = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};

export const clearCartForUser = async (userId) => {
  const cart = await Cart.findOneAndDelete({ userId });
  return cart;
};

export const addItemToCart = async ({
  userId,
  restaurantId,
  menuItemId,
  quantity = 1,
}) => {
  const menuItem = await MenuItem.findById(menuItemId);
  if (!menuItem) {
    const error = new Error("Menu item not found");
    error.statusCode = 404;
    throw error;
  }

  let cart = await Cart.findOne({ userId });

  
  if (!cart || cart.restaurantId.toString() !== restaurantId.toString()) {
    cart = new Cart({
      userId,
      restaurantId,
      items: [],
      subtotal: 0,
    });
  }

  const existingItem = cart.items.find(
    (it) => it.menuItemId.toString() === menuItemId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      menuItemId,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      image: menuItem.image,
      isVeg: menuItem.isVeg,
    });
  }

  recalculateSubtotal(cart);
  await cart.save();
  return cart;
};


export const updateCartItemQuantity = async ({ userId, itemId, quantity }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  
  const item = cart.items.find((it) => it._id.toString() === itemId.toString());
  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  if (quantity <= 0) {
    
    cart.items = cart.items.filter(
      (it) => it._id.toString() !== itemId.toString()
    );
  } else {
    item.quantity = quantity;
  }

  if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return null;
  }

  recalculateSubtotal(cart);
  await cart.save();
  return cart;
};


export const removeItemFromCart = async ({ userId, itemId }) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    throw error;
  }

  const beforeCount = cart.items.length;

  cart.items = cart.items.filter(
    (it) => it._id.toString() !== itemId.toString()
  );

  if (cart.items.length === beforeCount) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    throw error;
  }

  if (cart.items.length === 0) {
    await Cart.deleteOne({ _id: cart._id });
    return null;
  }

  recalculateSubtotal(cart);
  await cart.save();
  return cart;
};
