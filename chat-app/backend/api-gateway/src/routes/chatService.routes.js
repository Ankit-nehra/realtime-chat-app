import express from "express";
import axios from "axios";

const router = express.Router();

const CHAT_SERVICE = "https://chat-service-beaz.onrender.com/api/chat";

// 📤 Send Message
router.post("/send", async (req, res) => {
  try {
    const response = await axios.post(
      `${CHAT_SERVICE}/send`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// 📥 Get Messages
router.get("/messages", async (req, res) => {
  try {
    const response = await axios.get(
      `${CHAT_SERVICE}/messages`,
      { params: req.query }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
