import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function HomePage() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});

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

    socket.on("newNotification", (data) => {
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
    setUnreadCounts((prev) => ({ ...prev, [id]: 0 }));
    navigate(`/chat/${id}`);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* Top Bar */}
      <div className="relative z-10 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">

        <div>
          <h2 className="text-xl font-bold">🟢 Online Users</h2>
          <p className="text-xs text-gray-400">
            Click a user to start chatting instantly
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition shadow-lg shadow-red-600/30 text-sm"
        >
          Logout
        </button>
      </div>

      {/* Users List */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-3">

        {onlineUsers.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p className="text-lg">No users online</p>
            <p className="text-sm mt-1">Waiting for people to join…</p>
          </div>
        )}

        {onlineUsers
          .filter((id) => id !== userId)
          .map((id) => (
            <div
              key={id}
              onClick={() => openChat(id)}
              className="group cursor-pointer flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition shadow-lg"
            >

              {/* Left side */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>

                <div>
                  <p className="font-medium text-white">
                    User {id}
                  </p>
                  <p className="text-xs text-gray-400">
                    Online now
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">

                {unreadCounts[id] > 0 && (
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs shadow">
                    {unreadCounts[id]}
                  </span>
                )}

                <span className="text-xs text-gray-400 group-hover:text-white transition">
                  Open →
                </span>
              </div>

            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-gray-500 py-3 border-t border-white/10 bg-white/5 backdrop-blur-xl">
        Real-time chat powered by Socket.io ⚡
      </div>
    </div>
  );
}
