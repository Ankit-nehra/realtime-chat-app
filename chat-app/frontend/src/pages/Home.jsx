import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function HomePage() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({}); // ✅ NEW

  const userId = String(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (!userId) return;

    socket.connect();
    socket.emit("join", userId);

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    // ✅ NEW: notification listener
socket.on("newNotification", (data) => {
  console.log("🔔 Notification:", data);

  // ✅ SHOW TOAST
  toast(`New message from ${data.from}: ${data.message}`);

  setUnreadCounts((prev) => ({
    ...prev,
    [data.from]: (prev[data.from] || 0) + 1,
  }));
});

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("newNotification");
    };
  }, [userId]);

  const openChat = (id) => {
    // ✅ reset unread count
    setUnreadCounts((prev) => ({
      ...prev,
      [id]: 0,
    }));

    navigate(`/chat/${id}`);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-lg font-bold">🟢 Online Users</h2>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {onlineUsers.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No users online
          </p>
        )}

        {onlineUsers
          .filter((id) => id !== userId)
          .map((id) => (
            <div
              key={id}
              onClick={() => openChat(id)}
              className="bg-white p-3 rounded shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>User {id}</span>
              </div>

              {/* ✅ minimal UI addition */}
              <div className="flex items-center gap-2">
                {unreadCounts[id] > 0 && (
                  <span className="bg-red-500 text-white px-2 rounded-full text-xs">
                    {unreadCounts[id]}
                  </span>
                )}
                <span className="text-sm text-gray-400">Chat →</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}