import passport from "passport";
import { registerUser } from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser({ name, email, password });

  
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(201).json({
        message: "Registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (err) {
    next(err);
  }
};

// Local login using passport
export const loginLocal = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: info?.message || "Login failed" });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err2) => {
      if (err2) return next(err2);
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });
};

export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  return res.json({ user: req.user });
};
