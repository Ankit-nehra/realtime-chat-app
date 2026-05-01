import { registerUser, loginUser } from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    console.log("[Auth Controller] 📩 Register request received");
    console.log("[Auth Controller] 📦 Request Body:", req.body);

    const user = await registerUser(req.body);

    console.log("[Auth Controller] ✅ User registered:", user.email);

    const token = generateToken(user._id);

    console.log("[Auth Controller] 🔐 Token generated for user:", user._id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.error("[Auth Controller] ❌ Register error:", err.message);

    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("[Auth Controller] 📩 Login request received");
    console.log("[Auth Controller] 📦 Request Body:", req.body);

    const user = await loginUser(req.body);

    console.log("[Auth Controller] ✅ User logged in:", user.email);

    const token = generateToken(user._id);

    console.log("[Auth Controller] 🔐 Token generated for user:", user._id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.error("[Auth Controller] ❌ Login error:", err.message);

    res.status(400).json({ message: err.message });
  }
};