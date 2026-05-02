// src/api/user.api.js

import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
});

export const getOnlineUsers = () => API.get("/online");
