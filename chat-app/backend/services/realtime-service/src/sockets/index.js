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

    // JOIN USER
    socket.on("join", (userId) => {
      console.log("🟡 [JOIN EVENT] userId:", userId, "socketId:", socket.id);

      if (!userId) {
        console.log("⚠️ [JOIN ERROR] userId missing");
        return;
      }

      addUser(userId, socket.id);

      console.log("🟢 [ONLINE USERS UPDATED]", getOnlineUsers());

      io.emit("onlineUsers", getOnlineUsers());
    });

    // ✅ NEW: ACTIVE CHAT TRACKING
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
      console.log("➡️ Payload:", data);

      const receiverSocketId = onlineUsers.get(data.receiverId);

      console.log("🔎 [LOOKUP] receiverId:", data.receiverId);
      console.log("🔎 [LOOKUP RESULT] socketId:", receiverSocketId);

      if (!receiverSocketId) {
        console.log("❌ [DELIVERY FAILED] Receiver not online");
        return;
      }

      const receiverActiveChat = getActiveChat(data.receiverId);

      console.log("📍 [ACTIVE CHAT CHECK]", receiverActiveChat);

      // ✅ SAME CHAT → only message
      if (receiverActiveChat === data.senderId) {
        console.log("💬 [SAME CHAT] Direct message only");

        io.to(receiverSocketId).emit("receiveMessage", data);
        return;
      }

      // 🔔 DIFFERENT PAGE → message + notification
      console.log("🔔 [NOTIFICATION TRIGGERED]");

      io.to(receiverSocketId).emit("receiveMessage", data);

      io.to(receiverSocketId).emit("newNotification", {
        from: data.senderId,
        message: data.message,
      });

      console.log("✅ [EMIT SUCCESS] Message + notification sent");
    });

    // DISCONNECT
    socket.on("disconnect", (reason) => {
      console.log("🔴 [DISCONNECT] socketId:", socket.id);
      console.log("📌 Reason:", reason);

      removeUser(socket.id);

      console.log("🧹 [CLEANUP] Updated users:", getOnlineUsers());

      io.emit("onlineUsers", getOnlineUsers());
    });
  });
};