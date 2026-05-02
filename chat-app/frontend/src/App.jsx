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
import Welcome from "./pages/Welcome";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

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

        {/* ✅ PUBLIC WELCOME PAGE */}
        <Route
          path="/"
          element={
           isAuthenticated ? <Navigate to="/home" /> : <Welcome />
           }
        />

        {/* ✅ AUTH PAGES */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />
          }
        />

        {/* ✅ PROTECTED HOME */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />

        {/* ✅ PROTECTED CHAT */}
        <Route
          path="/chat/:id"
          element={
            isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
          }
        />

        {/* ✅ FALLBACK ROUTE */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
