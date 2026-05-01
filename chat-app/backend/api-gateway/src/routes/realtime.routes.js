import express from "express";
import axios from "axios";

const router = express.Router();

const REALTIME_SERVICE = "https://realtime-service-zd3u.onrender.com";

router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${REALTIME_SERVICE}/health`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
