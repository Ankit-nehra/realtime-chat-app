// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth.api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      toast.success("Account created successfully 🚀");
      console.log(res.data);
    } catch (err) {
      toast.error("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 relative overflow-hidden">

      {/* Glow effects */}
      <div className="absolute w-72 h-72 bg-green-600 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

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
          Create Account ✨
        </h2>

        <p className="text-center text-gray-400 text-sm mt-2">
          Join RealTime Chat and start connecting
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">

          <input
            placeholder="Name"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-green-500 transition font-semibold shadow-lg shadow-green-600/30">
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
