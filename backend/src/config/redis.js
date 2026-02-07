const redis = require("redis");

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: "redis://localhost:6379"
    });

    redisClient.on("error", (err) => {
      console.log(" Redis error:", err.message);
    });

    await redisClient.connect();
    console.log(" Redis connected");
  } catch (err) {
    console.log(" Redis not connected (optional):", err.message);
  }
};

module.exports = {
  redisClient,
  connectRedis
};
