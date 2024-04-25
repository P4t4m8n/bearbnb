import { PrismaClient } from "@prisma/client";
import { Stay, StaySmall } from "../model/stay.model";
import { getCache } from "./cache";

const prisma = new PrismaClient();

export async function getSmallStays(): Promise<StaySmall[] | undefined> {
  const cacheKey: string = "staysData";
  try {
    let stays = await getCache(cacheKey);
    if (stays) return stays;
    stays = await prisma.stay.findMany({
      select: {
        id: true,
        type: true,
        images: {
          take: 1,
          select: {
            url: true,
          },
        },
        price: true,
        locationId: true,
        location: true,
        reviews: {
          select: {
            rate: true,
          },
        },
      },
    });

    if (!stays) throw new Error("Unable to load");

    const mappedStays = stays.map(
      (stay: {
        id: any;
        type: any;
        images: { url: any }[];
        price: any;
        locationId: any;
        location: any;
        reviews: any[];
      }) => ({
        id: stay.id,
        type: stay.type,
        image: stay.images[0]?.url || "",
        price: stay.price,
        locationId: stay.locationId,
        location: stay.location,
        rating:
          stay.reviews.length > 0
            ? stay.reviews.reduce((acc, curr) => acc + curr.rate, 0) /
              stay.reviews.length
            : 0,
      })
    );

    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    return undefined;
  }
}
