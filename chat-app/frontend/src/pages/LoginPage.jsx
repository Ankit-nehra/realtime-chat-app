// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth.api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ added only
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await login(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("name", res.data.user.name); 
      toast.success("Login successful 🎉");

      window.location.href = "/home";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 relative overflow-hidden">

      {/* Glow effects */}
      <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="text-xs text-gray-400 hover:text-white mb-4 transition"
        >
          ← Back to Home
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-400 text-sm mt-2">
          Login to continue chatting
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* ✅ ONLY CHANGE HERE */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/30 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
