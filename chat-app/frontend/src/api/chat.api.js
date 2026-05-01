import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/chat",
});

export const sendMessage = (data) => API.post("/send", data);

export const getMessages = (user1, user2) =>
  API.get("/messages", {
    params: { user1, user2 },
  });