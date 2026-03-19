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
router.get("/logout", logout);
router.get("/me", getCurrentUser);

// Google OAuth
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    accessType: "offline",
  })(req, res, next);
});

router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", {
      failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
      session: true,
    })(req, res, next);
  },
  (req, res) => {
    const redirectUrl = `${process.env.CLIENT_URL}/oauth-success`;
    res.redirect(redirectUrl);
  },
);

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

export default router;
