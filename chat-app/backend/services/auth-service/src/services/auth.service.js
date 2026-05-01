import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ name, email, password }) => {
  console.log("[Auth Service] 🧩 RegisterUser called");
  console.log("[Auth Service] 📥 Input:", { name, email });

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.warn("[Auth Service] ⚠️ User already exists:", email);
    throw new Error("User already exists");
  }

  console.log("[Auth Service] 🔐 Hashing password...");
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("[Auth Service] 💾 Creating user in DB...");
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log("[Auth Service] ✅ User created with ID:", user._id);

  return user;
};

export const loginUser = async ({ email, password }) => {
  console.log("[Auth Service] 🧩 LoginUser called");
  console.log("[Auth Service] 📥 Input:", { email });

  const user = await User.findOne({ email });

  if (!user) {
    console.warn("[Auth Service] ❌ User not found:", email);
    throw new Error("Invalid credentials");
  }

  console.log("[Auth Service] 🔍 Comparing password...");
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.warn("[Auth Service] ❌ Password mismatch for:", email);
    throw new Error("Invalid credentials");
  }

  console.log("[Auth Service] ✅ Password matched for:", email);

  return user;
};