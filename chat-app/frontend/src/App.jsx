import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { socket } from "./socket/socket";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import ChatPage from "./pages/ChatPage";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  // ✅ CONNECT ONLY ON LOGIN
  useEffect(() => {
    if (isAuthenticated && !socket.connected) {
      socket.connect();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat/:id"
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
