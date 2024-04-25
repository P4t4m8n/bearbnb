import { PrismaClient } from "@prisma/client";
import { cacheData, getCachedData } from "./redisCache";
import { getCache, setCache } from "./cache";

const prisma = new PrismaClient();

export async function getStays(): Promise<any> {
  const cacheKey: string = "staysData";

  try {
    let stays = await getCache(cacheKey);
    if (!stays) {
      console.log("******************************************:")
      stays = await prisma.stay.findMany({
        include: {
          images: true,
          amenities: true,
          labels: true,
          host: true,
          location: true,
          reviews: {
            include: {
              user: true,
            },
          },
          likes: {
            include: {
              user: true,
            },
          },
        },
      });
      await setCache(cacheKey, stays);
    }
    return stays;
  } catch (error) {
    console.error(error);
  }
}
