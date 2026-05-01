export const onlineUsers = new Map();
// userId → socketId

// ✅ NEW
export const activeChats = new Map();
// userId → chatUserId

export const addUser = (userId, socketId) => {
  console.log("➕ [MAP ADD] userId:", userId, "socketId:", socketId);
  onlineUsers.set(userId, socketId);
};

export const removeUser = (socketId) => {
  console.log("➖ [MAP REMOVE] socketId:", socketId);

  for (let [userId, sId] of onlineUsers.entries()) {
    if (sId === socketId) {
      console.log("🗑️ [MAP DELETE] userId:", userId);
      onlineUsers.delete(userId);

      // ✅ cleanup active chat
      activeChats.delete(userId);

      break;
    }
  }
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};

// ✅ NEW FUNCTIONS
export const setActiveChat = (userId, chatUserId) => {
  activeChats.set(userId, chatUserId);
};

export const removeActiveChat = (userId) => {
  activeChats.delete(userId);
};

export const getActiveChat = (userId) => {
  return activeChats.get(userId);
};