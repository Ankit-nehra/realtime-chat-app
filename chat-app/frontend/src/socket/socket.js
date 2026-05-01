import { io } from "socket.io-client";

export const socket = io("http://localhost:5004", {
  autoConnect: false,
  transports: ["websocket"],
});