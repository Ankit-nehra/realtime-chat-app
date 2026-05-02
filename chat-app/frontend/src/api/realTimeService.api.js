import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/realtime`,
});

export const checkRealtimeStatus = () =>
  API.get("/health");
