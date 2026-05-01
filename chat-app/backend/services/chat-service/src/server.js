import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🌍 GLOBAL LOGGER
app.use((req, res, next) => {
  console.log(`🌐 [SERVER] ${req.method} ${req.url}`);
  next();
});

app.use("/api/chat", chatRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err.message));

app.listen(5003, () => {
  console.log("🚀 Chat Service running on 5003");
});