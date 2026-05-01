import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import realtimeRoutes from "./routes/realtime.routes.js";
import chatRoutes from "./routes/chatService.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/realtime", realtimeRoutes);
app.use("/api/chat", chatRoutes); 

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});