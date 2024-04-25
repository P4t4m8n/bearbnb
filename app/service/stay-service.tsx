import { PrismaClient } from "@prisma/client";
import { cacheData, getCachedData } from "./redisCache";
import { getCache, setCache } from "./cache";
import { Stay } from "../model/stay.model";

const prisma = new PrismaClient();

export async function getStays(): Promise<Stay[] | undefined> {
  try {
    const stays = await prisma.stay.findMany({
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

    if (!stays) throw new Error("Unable to load");

    return stays;
  } catch (error) {
    console.error(error);
  }
}
