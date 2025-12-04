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
      secure: isProduction,    
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: isProd ? "none" : "lax", 
    }
  });
};

export default sessionConfig;
