import MenuItem from "../models/MenuItem.js";

export const createMenuItem = async (restaurantId, data) => {
  const itemsData = data.data ? data.data : data;

  if (Array.isArray(itemsData)) {
    const formattedData = itemsData.map((item) => ({
      ...item,
      restaurantId,
    }));

    return await MenuItem.insertMany(formattedData);
  }

  return await MenuItem.create({
    ...itemsData,
    restaurantId,
  });
};

export const getMenuByRestaurant = async (restaurantId) => {
  const items = await MenuItem.find({ restaurantId, available: true }).sort({
    createdAt: 1,
  });
  return items;
};

export const updateMenuItem = async (id, data) => {
  const item = await MenuItem.findByIdAndUpdate(id, data, { new: true });
  if (!item) {
    const error = new Error("Menu item not found");
    error.statusCode = 404;
    throw error;
  }
  return item;
};

export const deleteMenuItem = async (id) => {
  const item = await MenuItem.findByIdAndDelete(id);
  if (!item) {
    const error = new Error("Menu item not found");
    error.statusCode = 404;
    throw error;
  }
  return item;
};
