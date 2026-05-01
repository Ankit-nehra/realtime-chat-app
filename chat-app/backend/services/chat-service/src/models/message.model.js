import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    message: String,
  },
  { timestamps: true }
);

// 🔥 SAFE DEBUG ONLY (NO next usage)
messageSchema.pre("save", function () {
  console.log("🧾 [MODEL] Saving message:", this.message);
});

messageSchema.post("save", function (doc) {
  console.log("✅ [MODEL] Saved:", doc._id);
});

export default mongoose.model("Message", messageSchema);