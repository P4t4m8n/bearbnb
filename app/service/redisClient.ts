import Redis from "ioredis";

const redis = new Redis({
  host: "localhost", // or the URL to your Redis server
  port: 6379, // default port for Redis
});

export default redis;
