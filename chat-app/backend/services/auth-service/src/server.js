import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

console.log("[Server] 🚀 Starting Auth Service...");

dotenv.config();
console.log("[Server] 📄 Environment variables loaded");

const app = express();

app.use(cors());
console.log("[Server] 🌐 CORS enabled");

app.use(express.json());
console.log("[Server] 📦 JSON parser enabled");

app.use("/api/auth", authRoutes);
console.log("[Server] 🔗 Auth routes mounted at /api/auth");

console.log("[Server] 🔌 Connecting to Database...");
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`[Server] ✅ Auth Service running on port ${PORT}`);
});