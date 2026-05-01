import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🌍 GLOBAL LOGGER
app.use((req, res, next) => {
  console.log(`🌐 [USER SERVICE] ${req.method} ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);

app.listen(5002, () => {
  console.log("🚀 User Service running on port 5002");
});