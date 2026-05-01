import express from "express";
import { login, register } from "../controllers/auth.controller.js";

console.log("[Auth Routes] 🚀 Initializing auth routes...");

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log("[Auth Routes] 👉 POST /register hit");
  next();
}, register);

router.post("/login", (req, res, next) => {
  console.log("[Auth Routes] 👉 POST /login hit");
  next();
}, login);

console.log("[Auth Routes] ✅ Routes ready");

export default router;