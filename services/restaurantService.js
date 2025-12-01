// services/restaurantService.js
import Restaurant from "../models/Restaurant.js";

export const createRestaurant = async (data) => {
  const restaurant = await Restaurant.create(data);
  return restaurant;
};

export const getAllRestaurants = async (filters = {}) => {
  const query = {};

  if (filters.city) {
    query["address.city"] = { $regex: filters.city, $options: "i" };
  }

  if (filters.cuisine) {
    query.cuisines = { $in: [filters.cuisine] };
  }

  if (filters.isActive !== undefined) {
    query.isActive = filters.isActive;
  }

  const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });
  return restaurants;
};

export const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }
  return restaurant;
};

export const updateRestaurant = async (id, data) => {
  const restaurant = await Restaurant.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }
  return restaurant;
};

export const deleteRestaurant = async (id) => {
  const restaurant = await Restaurant.findByIdAndDelete(id);
  if (!restaurant) {
    const error = new Error("Restaurant not found");
    error.statusCode = 404;
    throw error;
  }
  return restaurant;
};
