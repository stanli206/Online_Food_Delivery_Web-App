import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    console.log("Decoded:", decoded);
    console.log("User from DB:", req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token failed" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log("User role:", req.user?.role);
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};
