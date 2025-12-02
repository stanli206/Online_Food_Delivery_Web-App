import {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menuService.js";

export const createMenuItemController = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const data = req.body;
    const item = await createMenuItem(restaurantId, data);
    res.status(201).json({ item });
  } catch (err) {
    next(err);
  }
};

export const getMenuByRestaurantController = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const items = await getMenuByRestaurant(restaurantId);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

export const updateMenuItemController = async (req, res, next) => {
  try {
    const item = await updateMenuItem(req.params.id, req.body);
    res.json({ item });
  } catch (err) {
    next(err);
  }
};

export const deleteMenuItemController = async (req, res, next) => {
  try {
    await deleteMenuItem(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    next(err);
  }
};
