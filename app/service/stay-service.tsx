import { PrismaClient } from "@prisma/client";
import { Stay, StaySmall } from "../model/stay.model";

const prisma = new PrismaClient();

export async function getSmallStays(): Promise<StaySmall[] | undefined> {
  try {
    const stays = await prisma.stay.findMany({
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

    const mappedStays = stays.map((stay) => ({
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
    }));

    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    return undefined;
  }
}
