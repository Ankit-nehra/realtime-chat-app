
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../socket/socket";

export default function ChatPage() {
  const { id: receiverId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);

  // 📥 GET CHAT HISTORY
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat/messages", {
        params: { user1: userId, user2: receiverId },
      })
      .then((res) => setMessages(res.data));
  }, [receiverId]);

  // 👤 GET RECEIVER INFO
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        const user = res.data.find((u) => u._id === receiverId);
        setReceiver(user);
      });
  }, [receiverId]);

  // 🔌 SOCKET SETUP
  useEffect(() => {
    socket.connect();
    socket.emit("join", userId, name);

    socket.emit("activeChat", {
      userId,
      chatUserId: receiverId,
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveChat", { userId });
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [receiverId]);

  const isOnline = onlineUsers.some(
    (u) => u.userId === receiverId
  );

  // 📤 SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: userId,
      receiverId,
      message,
    };

    const res = await axios.post(
      "http://localhost:5000/api/chat/send",
      msgData
    );

    setMessages((prev) => [...prev, res.data]);

    socket.emit("sendMessage", res.data);

    setMessage("");
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-black text-white">

      {/* HEADER */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">

        <button onClick={() => navigate("/home")}>
          ← Back
        </button>

        <div className="text-center">


          <p className="text-xs text-gray-400">
            {isOnline ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>

        <div />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg w-fit max-w-xs ${
              msg.senderId === userId
                ? "bg-blue-600 ml-auto"
                : "bg-gray-700"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 flex gap-2 border-t border-gray-700">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 bg-gray-800 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
