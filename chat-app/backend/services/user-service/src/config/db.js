import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("🟢 [USER SERVICE] DB Connected");
  } catch (err) {
    console.log("❌ [USER SERVICE] DB Error:", err.message);
    process.exit(1);
  }
};