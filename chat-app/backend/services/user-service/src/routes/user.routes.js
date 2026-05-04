
import express from "express";
import { fetchAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// 🌐 ROUTE LOGGER
router.use((req, res, next) => {
  console.log(`🌐 [USER ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ GET ALL USERS
router.get("/", fetchAllUsers);

export default router;
