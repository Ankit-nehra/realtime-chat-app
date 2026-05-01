import express from "express";
import { fetchOnlineUsers } from "../controllers/user.controller.js";

const router = express.Router();

// 🌐 ROUTE LOGGER
router.use((req, res, next) => {
  console.log(`🌐 [USER ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/online", fetchOnlineUsers);

export default router;