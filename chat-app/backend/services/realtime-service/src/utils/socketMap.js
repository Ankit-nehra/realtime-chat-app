import { redisClient } from "../config/redis.js";


// Redis Keys

const ONLINE_USERS_KEY = "online_users";
const ACTIVE_CHATS_KEY = "active_chats";



// ==============================
// ADD ONLINE USER
// ==============================

export const addUser = async (
  userId,
  socketId,
  name = null
) => {


  console.log(
    "➕ [REDIS ADD USER]",
    userId
  );


  const userData = {

    socketId,

    joinTime:
      new Date().toISOString(),

    name,

  };



  await redisClient.hSet(

    ONLINE_USERS_KEY,

    userId,

    JSON.stringify(userData)

  );


};




// ==============================
// REMOVE USER
// ==============================

export const removeUser = async (
  socketId
) => {


  console.log(
    "➖ [REDIS REMOVE USER]",
    socketId
  );



  const users =
    await redisClient.hGetAll(
      ONLINE_USERS_KEY
    );



  for(
    const userId in users
  ){


    const user =
      JSON.parse(
        users[userId]
      );



    if(
      user.socketId === socketId
    ){


      await redisClient.hDel(
        ONLINE_USERS_KEY,
        userId
      );


      await removeActiveChat(
        userId
      );


      console.log(
        "🗑️ Removed User:",
        userId
      );


      break;

    }

  }

};




// ==============================
// GET ONLINE USERS
// ==============================

export const getOnlineUsers =
async()=>{


  const users =
    await redisClient.hGetAll(
      ONLINE_USERS_KEY
    );



  return Object.entries(users)
  .map(
    ([userId,data])=>{


      const user =
        JSON.parse(data);



      return {

        userId,

        socketId:
          user.socketId,

        joinTime:
          user.joinTime,

        name:
          user.name

      };


    }
  );


};




// ==============================
// ACTIVE CHAT
// ==============================


export const setActiveChat =
async(
 userId,
 chatUserId
)=>{


 await redisClient.hSet(

   ACTIVE_CHATS_KEY,

   userId,

   chatUserId

 );


};





export const removeActiveChat =
async(
 userId
)=>{


 await redisClient.hDel(

   ACTIVE_CHATS_KEY,

   userId

 );


};





export const getActiveChat =
async(
 userId
)=>{


 return await redisClient.hGet(

   ACTIVE_CHATS_KEY,

   userId

 );


};
