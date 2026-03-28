import express from "express";
import passport from "passport";
import {
  register,
  loginLocal,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();


router.post("/register", register);
router.post("/login", loginLocal);
router.post("/logout", logout);
router.get("/me",protect, adminOnly, getCurrentUser);


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false, 
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = generateToken(req.user);

    
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;