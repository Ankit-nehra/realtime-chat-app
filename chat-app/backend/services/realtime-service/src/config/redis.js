import { createClient } from "redis";

const redisURL = process.env.REDIS_URL;


if (!redisURL) {
  throw new Error(
    "❌ REDIS_URL missing in environment variables"
  );
}



export const redisClient = createClient({
  url: redisURL,

  socket:{
    reconnectStrategy:(retries)=>{

      console.log(
        `🔄 Redis reconnect attempt: ${retries}`
      );


      if(retries > 10){

        return new Error(
          "Redis reconnect failed"
        );

      }


      return Math.min(
        retries * 100,
        3000
      );

    }
  }

});



export const pubClient =
createClient({
  url:redisURL
});



export const subClient =
pubClient.duplicate();




redisClient.on(
  "ready",
  ()=>{
    console.log(
      "🟢 Redis Main Client Ready"
    );
  }
);



redisClient.on(
  "error",
  (err)=>{
    console.error(
      "❌ Redis Main Client Error:",
      err.message
    );
  }
);



pubClient.on(
  "ready",
  ()=>{
    console.log(
      "🟢 Redis Pub Client Ready"
    );
  }
);



subClient.on(
  "ready",
  ()=>{
    console.log(
      "🟢 Redis Sub Client Ready"
    );
  }
);




export const connectRedis = async()=>{

try{


await Promise.all([

 redisClient.connect(),

 pubClient.connect(),

 subClient.connect()

]);



console.log(
"🚀 Redis Connected Successfully"
);



}catch(error){


console.error(
"❌ Redis Connection Failed:",
error.message
);



process.exit(1);



}


};
