import express from "express";
import http from "http";
import cors from "cors";
import { initSocket } from "./sockets/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// HTTP server
const server = http.createServer(app);

console.log("⚙️ [INIT] Starting Realtime Service...");

// socket init
initSocket(server);

// health check
app.get("/health", (req, res) => {
  console.log("💓 [HEALTH CHECK]");
  res.json({ status: "Realtime service running" });
});

const PORT = 5004;

server.listen(PORT, () => {
  console.log(`🚀 Realtime Service running on ${PORT}`);
});