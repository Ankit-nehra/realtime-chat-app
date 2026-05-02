import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/chat`,
});

export const sendMessage = (data) => API.post("/send", data);

export const getMessages = (user1, user2) =>
  API.get("/messages", {
    params: { user1, user2 },
  });
