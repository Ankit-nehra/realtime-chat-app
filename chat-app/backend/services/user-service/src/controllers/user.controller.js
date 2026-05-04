
import { getAllUsers } from "../services/user.service.js";

export const fetchAllUsers = async (req, res) => {
  try {
    console.log("📥 [USER CONTROLLER] fetchAllUsers HIT");

    const users = await getAllUsers();

    console.log("📦 Users count:", users.length);

    res.json(users);
  } catch (err) {
    console.log("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
