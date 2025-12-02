import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../services/restaurantService.js";

export const createRestaurantController = async (req, res, next) => {
  try {
    const data = req.body;
    const restaurant = await createRestaurant(data);
    res.status(201).json({ restaurant });
  } catch (err) {
    next(err);
  }
};

export const getRestaurantsController = async (req, res, next) => {
  try {
    const filters = {
      city: req.query.city,
      cuisine: req.query.cuisine,
      isActive:
        typeof req.query.isActive !== "undefined"
          ? req.query.isActive === "true"
          : undefined,
    };

    const restaurants = await getAllRestaurants(filters);
    res.json({ restaurants });
  } catch (err) {
    next(err);
  }
};

export const getRestaurantByIdController = async (req, res, next) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.json({ restaurant });
  } catch (err) {
    next(err);
  }
};

export const updateRestaurantController = async (req, res, next) => {
  try {
    const restaurant = await updateRestaurant(req.params.id, req.body);
    res.json({ restaurant });
  } catch (err) {
    next(err);
  }
};

export const deleteRestaurantController = async (req, res, next) => {
  try {
    await deleteRestaurant(req.params.id);
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    next(err);
  }
};
