import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// 🌍 GLOBAL LOGGER
app.use((req, res, next) => {
  console.log(`🌐 [USER SERVICE] ${req.method} ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);

app.listen(5002, () => {
  console.log("🚀 User Service running on port 5002");
});
