// src/api/user.api.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
});

export const getOnlineUsers = () => API.get("/online");