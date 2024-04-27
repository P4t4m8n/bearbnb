import redis from "./redisClient";

export const setCache = async (key: string, value: any, ttl: number = 3600) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};

export const getCache = async (key: string): Promise<any | null> => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};
