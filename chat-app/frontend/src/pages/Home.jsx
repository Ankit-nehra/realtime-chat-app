
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function HomePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [search, setSearch] = useState(""); // ✅ NEW

  const userId = String(localStorage.getItem("userId"));
  const navigate = useNavigate();

  // // ✅ Fetch ALL USERS
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axios.get("https://api-gateway-service-thia.onrender.com/api/users");
  //       setAllUsers(res.data);
  //     } catch (err) {
  //       console.log("Error fetching users:", err.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // ✅ SOCKET (ONLINE USERS + NOTIFICATIONS)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !userId) return;

    socket.connect();
    socket.emit("join", userId, localStorage.getItem("name"));

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

  // ✅ Check if user is online
  const isOnline = (id) => {
    return onlineUsers.some((u) => u.userId === id);
  };

  // ✅ Sort users (online first)
  const sortedUsers = [...allUsers]
    .filter((u) => u._id !== userId)
    .sort((a, b) => {
      const aOnline = isOnline(a._id);
      const bOnline = isOnline(b._id);

      if (aOnline === bOnline) return 0;
      return aOnline ? -1 : 1;
    });

  // ✅ NEW: Filter by search
  const filteredUsers = sortedUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-bold">Let's chatting</h2>
          <p className="text-xs text-gray-400">Click to start chat</p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="px-6 pt-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">

        {filteredUsers.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            <p>No users found</p>
          </div>
        )}

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => openChat(user._id)}
            className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition"
          >
            {/* LEFT */}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* ONLINE STATUS */}
              <div className="flex items-center gap-2">
                {isOnline(user._id) ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                ) : (
                  <span className="h-3 w-3 rounded-full bg-gray-500"></span>
                )}

                <span className="text-xs text-gray-400">
                  {isOnline(user._id) ? "Online" : "Offline"}
                </span>
              </div>

              {/* UNREAD COUNT */}
              {unreadCounts[user._id] > 0 && (
                <span className="bg-red-500 px-2 py-1 text-xs rounded-full">
                  {unreadCounts[user._id]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
