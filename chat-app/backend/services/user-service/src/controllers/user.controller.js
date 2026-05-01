import { getOnlineUsers } from "../services/presence.service.js";

export const fetchOnlineUsers = (req, res) => {
  console.log("📥 [USER CONTROLLER] fetchOnlineUsers HIT");

  const users = getOnlineUsers();

  console.log("🟢 [USER CONTROLLER] Online users count:", users.length);
  console.log("➡️ Online users:", users);

  res.json({ onlineUsers: users });
};