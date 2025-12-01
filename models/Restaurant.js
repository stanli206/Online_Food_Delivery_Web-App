// models/Restaurant.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    address: addressSchema,
    image: String,          // Cloudinary URL later
    cuisines: [String],     // ['South Indian', 'Chinese']
    rating: { type: Number, default: 0 },
    deliveryTime: Number,   // in minutes
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
