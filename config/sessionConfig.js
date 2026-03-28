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
      sameSite: isProduction ? "none" : "lax", 
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
};