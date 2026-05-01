const onlineUsers = new Map();
// userId → socketId

export const addUser = (userId, socketId) => {
  console.log("➕ [PRESENCE] addUser:", { userId, socketId });

  onlineUsers.set(userId, socketId);

  console.log("📊 [PRESENCE] Total online users:", onlineUsers.size);
};

export const removeUser = (socketId) => {
  console.log("➖ [PRESENCE] removeUser socketId:", socketId);

  for (let [userId, sId] of onlineUsers.entries()) {
    if (sId === socketId) {
      console.log("🗑️ [PRESENCE] Removing userId:", userId);
      onlineUsers.delete(userId);
      break;
    }
  }

  console.log("📊 [PRESENCE] After remove:", onlineUsers.size);
};

export const getOnlineUsers = () => {
  const users = Array.from(onlineUsers.keys());

  console.log("🔍 [PRESENCE] getOnlineUsers:", users);

  return users;
};