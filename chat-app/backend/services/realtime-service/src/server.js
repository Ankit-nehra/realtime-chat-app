import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { initSocket } from "./sockets/index.js";
import { connectRedis } from "./config/redis.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());



const server = http.createServer(app);



console.log("⚙️ [INIT] Starting Realtime Service...");



const startServer = async () => {

  try {

    await connectRedis();


    initSocket(server);


    app.get("/health", (req,res)=>{

      res.json({
        status:"Realtime service running",
        redis:"connected"
      });

    });


    const PORT = process.env.PORT || 5004;


    server.listen(PORT,()=>{

      console.log(
        `🚀 Realtime Service running on ${PORT}`
      );

    });


  } catch(error){

    console.log(
      "❌ Server Startup Error:",
      error.message
    );

    process.exit(1);

  }

};



startServer();
