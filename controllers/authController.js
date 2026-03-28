import passport from "passport";
import {
  registerUser,
  validateUserCredentials,
} from "../services/authService.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({ name, email, password });

    const token = generateToken(user);

    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginLocal = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await validateUserCredentials({ email, password });

    const token = generateToken(user);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  return res.json({ message: "Logout handled on frontend (delete token)" });
};

export const getCurrentUser = async (req, res) => {
  return res.json({ user: req.user });
};