// redisCache.ts
import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  url: "redis://localhost:6379", // or your Redis server URL
});

redisClient.on("error", (err: Error) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

export async function cacheData(
  key: string,
  data: any,
  ttl: number = 3600
): Promise<void> {
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl, // Set the expiry for automatic invalidation
  });
}

export async function getCachedData(key: string): Promise<any> {
  const data: string | null = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}
