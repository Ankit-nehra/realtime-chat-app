import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;


if (!redisURL) {
  throw new Error(
    "❌ REDIS_URL missing in environment variables"
  );
}


export const pubClient = createClient({
  url: redisURL,
});


export const subClient = pubClient.duplicate();


pubClient.on("connect", () => {
  console.log("🔵 Redis Pub Client Connecting...");
});


pubClient.on("ready", () => {
  console.log("🟢 Redis Pub Client Ready");
});


pubClient.on("error", (err) => {
  console.log(
    "❌ Redis Pub Client Error:",
    err.message
  );
});


subClient.on("error", (err) => {
  console.log(
    "❌ Redis Sub Client Error:",
    err.message
  );
});


export const connectRedis = async () => {

  await Promise.all([
    pubClient.connect(),
    subClient.connect(),
  ]);


  console.log(
    "🚀 Redis Connected Successfully"
  );

};
