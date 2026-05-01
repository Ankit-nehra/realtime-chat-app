import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  console.log("[Token Utility] 🔐 Generating token for user:", userId);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  console.log("[Token Utility] ✅ Token generated");

  return token;
};