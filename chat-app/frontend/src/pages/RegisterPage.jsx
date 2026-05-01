// src/pages/RegisterPage.jsx
import { useState } from "react";
import { register } from "../api/auth.api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Create Account ✨
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-green-500 hover:bg-green-600 transition text-white p-3 rounded-lg font-semibold">
          Register
        </button>
      </form>
    </div>
  );
}