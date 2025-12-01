// routes/authRoutes.js
import express from "express";
import {
  register,
  loginLocal,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

// Local
router.post("/register", register);
router.post("/login", loginLocal);
router.post("/logout", logout);
router.get("/me", getCurrentUser);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    session: true,
  }),
  (req, res) => {
    // After successful OAuth, redirect to frontend (React app) with maybe query param
    const redirectUrl = `${process.env.CLIENT_URL}/oauth-success`;
    res.redirect(redirectUrl);
  }
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

export default router;
