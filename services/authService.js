import bcrypt from "bcryptjs";
import User from "../models/User.js";

const SALT_ROUNDS = 10;


export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already registered");
  }

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "user",
  });

  return user;
};


export const validateUserCredentials = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};


export const findOrCreateOAuthUser = async ({ provider, oauthId, email, name }) => {
  let user = await User.findOne({ email });

  if (user) {
    
    if (!user.oauthProvider) {
      user.oauthProvider = provider;
      user.oauthId = oauthId;
      await user.save();
    }
    return user;
  }

  user = await User.create({
    name,
    email,
    oauthProvider: provider,
    oauthId,
    role: "user",
  });

  return user;
};
