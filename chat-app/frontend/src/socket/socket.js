import { io } from "socket.io-client";

export const socket = io("https://realtime-service-zd3u.onrender.com", {
  autoConnect: false,
  transports: ["websocket"],
});
