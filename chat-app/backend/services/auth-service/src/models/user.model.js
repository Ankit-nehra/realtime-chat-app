import mongoose from "mongoose";

console.log("[User Model] 📦 Initializing User schema...");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

console.log("[User Model] ✅ User schema created");

export default mongoose.model("User", userSchema);