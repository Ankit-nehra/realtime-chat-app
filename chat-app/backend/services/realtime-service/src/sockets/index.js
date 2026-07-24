import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";

import {
  pubClient,
  subClient,
} from "../config/redis.js";


import {
  addUser,
  removeUser,
  getOnlineUsers,
  onlineUsers,
  setActiveChat,
  removeActiveChat,
  getActiveChat,
} from "../utils/socketMap.js";



export const initSocket = (server) => {


  const io = new Server(server, {

    cors: {
      origin: "*",
    },

  });



  // 🔥 SOCKET.IO REDIS ADAPTER
  io.adapter(
    createAdapter(
      pubClient,
      subClient
    )
  );


  console.log(
    "🚀 Socket.IO Redis Adapter Enabled"
  );



  io.on("connection", (socket) => {


    console.log(
      "🔵 [CONNECT] User connected:",
      socket.id
    );



    // ==========================
    // JOIN USER
    // ==========================

    socket.on("join", (userId, name) => {


      console.log(
        "🟡 [JOIN EVENT]",
        userId,
        socket.id
      );


      if (!userId) {

        console.log(
          "⚠️ [JOIN ERROR] userId missing"
        );

        return;
      }



      addUser(
        userId,
        socket.id,
        name || null
      );



      console.log(
        "🟢 [ONLINE USERS UPDATED]",
        getOnlineUsers()
      );



      io.emit(
        "onlineUsers",
        getOnlineUsers()
      );


    });




    // ==========================
    // ACTIVE CHAT TRACKING
    // ==========================


    socket.on(
      "activeChat",
      ({ userId, chatUserId }) => {


        console.log(
          "💬 [ACTIVE CHAT]",
          userId,
          "->",
          chatUserId
        );


        setActiveChat(
          userId,
          chatUserId
        );


      }
    );




    socket.on(
      "leaveChat",
      ({ userId }) => {


        console.log(
          "🚪 [LEAVE CHAT]",
          userId
        );


        removeActiveChat(userId);


      }
    );





    // ==========================
    // SEND MESSAGE
    // ==========================


    socket.on(
      "sendMessage",
      (data) => {


        console.log(
          "🟣 [SEND MESSAGE EVENT RECEIVED]"
        );



        const receiverSocketId =
          onlineUsers.get(data.receiverId)
          ?.socketId;



        if (!receiverSocketId) {


          console.log(
            "❌ [DELIVERY FAILED] Receiver offline"
          );


          return;

        }





        const receiverActiveChat =
          getActiveChat(
            data.receiverId
          );





        // User already opened chat

        if (
          receiverActiveChat === data.senderId
        ) {


          io
          .to(receiverSocketId)
          .emit(
            "receiveMessage",
            data
          );


          return;

        }







        // Send message

        io
        .to(receiverSocketId)
        .emit(
          "receiveMessage",
          data
        );






        // Notification

        io
        .to(receiverSocketId)
        .emit(
          "newNotification",
          {
            from:data.senderId,
            message:data.message,
          }
        );



      }
    );







    // ==========================
    // DISCONNECT
    // ==========================


    socket.on(
      "disconnect",
      (reason)=>{


        console.log(
          "🔴 [DISCONNECT]",
          socket.id,
          reason
        );



        removeUser(
          socket.id
        );



        io.emit(
          "onlineUsers",
          getOnlineUsers()
        );



      }
    );



  });



};
