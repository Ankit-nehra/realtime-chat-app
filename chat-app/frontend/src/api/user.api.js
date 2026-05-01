// src/api/user.api.js

import axios from "axios";

const API = axios.create({
  baseURL: "https://api-gateway-service-thia.onrender.com/api/users",
});

export const getOnlineUsers = () => API.get("/online");
