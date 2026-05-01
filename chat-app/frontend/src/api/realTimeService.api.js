import axios from "axios";

const API = axios.create({
  baseURL: "https://api-gateway-service-thia.onrender.com/api/realtime",
});

export const checkRealtimeStatus = () =>
  API.get("/health");
