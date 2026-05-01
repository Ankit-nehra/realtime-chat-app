import axios from "axios";

const AUTH_SERVICE_URL = "http://localhost:5001/api/auth";

export const registerProxy = async (req, res) => {
  try {
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/register`,
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.response?.data || err.message);
  }
};

export const loginProxy = async (req, res) => {
  try {
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/login`,
      req.body
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json(err.response?.data || err.message);
  }
};