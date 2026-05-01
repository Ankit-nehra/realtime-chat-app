import express from "express";
import axios from "axios";

const router = express.Router();

const USER_SERVICE_URL = "https://user-service-tz4x.onrender.com/api/users";

router.get("/online", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/online`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;
