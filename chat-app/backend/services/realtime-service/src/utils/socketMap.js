export const onlineUsers = new Map();
// userId → { socketId, joinTime, name }

export const activeChats = new Map();

export const addUser = (userId, socketId, name = null) => {
  console.log("➕ [MAP ADD] userId:", userId, "socketId:", socketId);

  onlineUsers.set(userId, {
    socketId,
    joinTime: new Date().toISOString(),
    name,
  });
};

export const removeUser = (socketId) => {
  console.log("➖ [MAP REMOVE] socketId:", socketId);

  for (let [userId, data] of onlineUsers.entries()) {
    if (data.socketId === socketId) {
      console.log("🗑️ [MAP DELETE] userId:", userId);
      onlineUsers.delete(userId);
      activeChats.delete(userId);
      break;
    }
  }
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.entries()).map(([userId, data]) => ({
    userId,
    socketId: data.socketId,
    joinTime: data.joinTime,
    name: data.name,
  }));
};

export const setActiveChat = (userId, chatUserId) => {
  activeChats.set(userId, chatUserId);
};

export const removeActiveChat = (userId) => {
  activeChats.delete(userId);
};

export const getActiveChat = (userId) => {
  return activeChats.get(userId);
};
