import { saveMessage, getMessages } from "../services/chat.service.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("📩 [CONTROLLER] sendMessage HIT");
    console.log("➡️ Body:", req.body);

    const msg = await saveMessage(req.body);

    console.log("💾 [CONTROLLER] Message saved:", msg._id);

    res.json(msg);
  } catch (err) {
    console.log("❌ [CONTROLLER ERROR] sendMessage:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const fetchMessages = async (req, res) => {
  try {
    console.log("📥 [CONTROLLER] fetchMessages HIT");
    console.log("➡️ Query:", req.query);

    const { user1, user2 } = req.query;

    const msgs = await getMessages(user1, user2);

    console.log("📦 [CONTROLLER] Messages count:", msgs.length);

    res.json(msgs);
  } catch (err) {
    console.log("❌ [CONTROLLER ERROR] fetchMessages:", err.message);
    res.status(500).json({ error: err.message });
  }
};