import express from "express";
import { registerProxy, loginProxy } from "../proxy/auth.proxy.js";

const router = express.Router();

router.post("/register", registerProxy);
router.post("/login", loginProxy);

export default router;