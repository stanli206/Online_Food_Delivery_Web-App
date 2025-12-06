import session from "express-session";
import MongoStore from "connect-mongo";

const sessionConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,                 // HTTPS only in prod
      sameSite: isProduction ? "none" : "lax", // cross-site Netlify <-> Render
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
};

export default sessionConfig;