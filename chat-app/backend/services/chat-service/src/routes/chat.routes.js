import express from "express";
import { sendMessage, fetchMessages } from "../controllers/chat.controller.js";

const router = express.Router();

// 🔥 ROUTE LOGGER
router.use((req, res, next) => {
  console.log(`🌐 [ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

router.post("/send", sendMessage);
router.get("/messages", fetchMessages);

export default router;