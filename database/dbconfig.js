// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// // Accept an optional uri (falls back to process.env.MONGO_URI).
// export async function connectDB(uri = process.env.MONGO_URI) {
//   try {
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");

//     // optional helpful listeners
//     mongoose.connection.on("error", (err) =>
//       console.error("MongoDB connection error:", err)
//     );
//     mongoose.connection.on("disconnected", () =>
//       console.log("MongoDB disconnected")
//     );
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     throw err;
//   }
// }

// export async function disconnectDB() {
//   try {
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   } catch (err) {
//     console.error("Error disconnecting MongoDB:", err);
//   }
// }
