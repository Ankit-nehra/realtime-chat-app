import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;

if (!redisURL) {
  throw new Error("❌ REDIS_URL missing in environment variables");
}

export const pubClient = createClient({
  url: redisURL,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`🔄 Redis reconnect attempt: ${retries}`);

      if (retries > 10) {
        return new Error("Redis reconnect failed");
      }

      return Math.min(retries * 100, 3000);
    },
  },
});

export const subClient = pubClient.duplicate();


pubClient.on("connect", () => {
  console.log("🔵 Redis Pub Client Connecting...");
});

pubClient.on("ready", () => {
  console.log("🟢 Redis Pub Client Ready");
});

pubClient.on("end", () => {
  console.log("🔴 Redis Pub Client Closed");
});

pubClient.on("error", (err) => {
  console.error("❌ Redis Pub Client Error:", err.message);
});


subClient.on("connect", () => {
  console.log("🔵 Redis Sub Client Connecting...");
});

subClient.on("ready", () => {
  console.log("🟢 Redis Sub Client Ready");
});

subClient.on("end", () => {
  console.log("🔴 Redis Sub Client Closed");
});

subClient.on("error", (err) => {
  console.error("❌ Redis Sub Client Error:", err.message);
});


export const connectRedis = async () => {
  try {
    await pubClient.connect();
    await subClient.connect();

    console.log("🚀 Redis Connected Successfully");

  } catch (error) {
    console.error("❌ Redis Connection Failed:", error.message);
    process.exit(1);
  }
};
