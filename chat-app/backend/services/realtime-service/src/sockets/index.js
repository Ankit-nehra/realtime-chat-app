import { Server } from "socket.io";
import {
  addUser,
  removeUser,
  getOnlineUsers,
  onlineUsers,
  setActiveChat,
  removeActiveChat,
  getActiveChat,
} from "../utils/socketMap.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🔵 [CONNECT] User connected:", socket.id);

    // JOIN USER (SAFE EXTENDED)
    socket.on("join", (userId, name) => {
      console.log("🟡 [JOIN EVENT] userId:", userId, "socketId:", socket.id);
 console.log("DEBUG NAME:", name);
      if (!userId) {
        console.log("⚠️ [JOIN ERROR] userId missing");
        return;
      }

      addUser(userId, socket.id, name || null);

      console.log("🟢 [ONLINE USERS UPDATED]", getOnlineUsers());

      io.emit("onlineUsers", getOnlineUsers());
    });

    // ACTIVE CHAT TRACKING
    socket.on("activeChat", ({ userId, chatUserId }) => {
      console.log("💬 [ACTIVE CHAT]", userId, "->", chatUserId);
      setActiveChat(userId, chatUserId);
    });

    socket.on("leaveChat", ({ userId }) => {
      console.log("🚪 [LEAVE CHAT]", userId);
      removeActiveChat(userId);
    });

    // SEND MESSAGE
    socket.on("sendMessage", (data) => {
      console.log("🟣 [SEND MESSAGE EVENT RECEIVED]");

      const receiverSocketId = onlineUsers.get(data.receiverId)?.socketId;

      if (!receiverSocketId) {
        console.log("❌ [DELIVERY FAILED] Receiver not online");
        return;
      }

      const receiverActiveChat = getActiveChat(data.receiverId);

      if (receiverActiveChat === data.senderId) {
        io.to(receiverSocketId).emit("receiveMessage", data);
        return;
      }

      io.to(receiverSocketId).emit("receiveMessage", data);

      io.to(receiverSocketId).emit("newNotification", {
        from: data.senderId,
        message: data.message,
      });
    });

    // DISCONNECT
    socket.on("disconnect", (reason) => {
      console.log("🔴 [DISCONNECT] socketId:", socket.id);

      removeUser(socket.id);

      io.emit("onlineUsers", getOnlineUsers());
    });
  });
};
