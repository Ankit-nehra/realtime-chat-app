import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("[DB] 🔄 Attempting to connect to MongoDB...");

    if (!process.env.MONGO_URI) {
      console.error("[DB] ❌ MONGO_URI missing in environment variables");
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("[DB] ✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("[DB] ❌ Connection Failed:", error.message);
    process.exit(1);
  }
};