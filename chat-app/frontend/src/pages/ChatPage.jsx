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

    // ✅ NEW
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
      // ✅ NEW
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
    <div className="h-screen flex flex-col bg-gray-100">

      <div className="p-3 bg-white shadow flex gap-3">
        <button onClick={() => navigate("/home")}>
          ← Back
        </button>

        <p>Chat with {receiverId}</p>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 space-y-2"
      >
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`p-2 rounded max-w-[70%] ${
              msg.senderId === userId
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white"
            }`}
          >
            {msg.message}
          </div>
        ))}

        <div ref={messagesEndRef}></div>
      </div>

      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-20 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg"
        >
          ↓
        </button>
      )}

      <div className="p-3 bg-white flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={sendMsg}
          className="bg-green-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>

    </div>
  );
}