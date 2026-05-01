import Message from "../models/message.model.js";

export const saveMessage = async (data) => {
  console.log("🛠️ [SERVICE] saveMessage:", data);

  const msg = await Message.create(data);

  console.log("💾 [SERVICE] Saved ID:", msg._id);

  return msg;
};

export const getMessages = async (user1, user2) => {
  console.log("🔍 [SERVICE] getMessages");
  console.log("user1:", user1, "user2:", user2);

  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 },
    ],
  }).sort({ createdAt: 1 });

  console.log("📦 [SERVICE] Found:", messages.length);

  return messages;
};