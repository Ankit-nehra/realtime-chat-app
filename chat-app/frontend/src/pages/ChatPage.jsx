import { useEffect, useState, useRef } from "react";
import { socket } from "../socket/socket";
import { useParams, useNavigate } from "react-router-dom";
import { sendMessage, getMessages } from "../api/chat.api";

export default function ChatPage() {
  const { id: receiverId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // LOAD CHAT HISTORY
  useEffect(() => {
    const fetchChat = async () => {
      const res = await getMessages(userId, receiverId);
      setMessages(res.data);
    };

    fetchChat();
  }, [receiverId]);

  // SOCKET LISTENER
  useEffect(() => {
    socket.emit("join", userId);

    socket.emit("activeChat", {
      userId,
      chatUserId: receiverId,
    });

    const handleMessage = (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev;
        return [...prev, msg];
      });
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.emit("leaveChat", { userId });
      socket.off("receiveMessage", handleMessage);
    };
  }, [userId, receiverId]);

  // SEND MESSAGE
  const sendMsg = async () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: userId,
      receiverId,
      message,
    };

    try {
      const res = await sendMessage(msgData);

      setMessages((prev) => [...prev, res.data]);

      socket.emit("sendMessage", res.data);

      setMessage("");
    } catch (err) {
      console.log("Send error:", err.message);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isNotAtBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight > 120;

      setShowScrollBtn(isNotAtBottom);
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10">

        <button
          onClick={() => navigate("/home")}
          className="text-sm text-gray-300 hover:text-white transition"
        >
          ← Back
        </button>

        <div className="text-center">
          <p className="text-sm font-semibold">User {receiverId}</p>
          <p className="text-xs text-gray-400">Active chat</p>
        </div>

        <div className="w-10" />
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md break-words ${
                msg.senderId === userId
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white/10 text-white border border-white/10 rounded-bl-sm"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Scroll button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-5 bg-green-500 hover:bg-green-400 text-white p-3 rounded-full shadow-lg transition"
        >
          ↓
        </button>
      )}

      {/* Input box */}
      <div className="relative z-10 p-3 bg-white/5 backdrop-blur-xl border-t border-white/10 flex gap-2">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMsg}
          className="px-5 py-3 bg-green-600 hover:bg-green-500 transition rounded-xl font-semibold shadow-lg shadow-green-600/30"
        >
          Send
        </button>
      </div>
    </div>
  );
}
