import { prisma } from "@/prisma/prisma";
import { Stay, StaySmall } from "../model/stay.model";
import { getCache, setCache } from "./cache";

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
    await setCache(cacheKey, mappedStays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    return undefined;
  }
}

export async function getStayById(stayId: string): Promise<Stay> {
  const cacheKey: string = "details";

  try {
    let stay = await getCache(cacheKey);
    if (!stay) {
      stay = await prisma.stay.findUnique({
        where: { id: stayId },
        include: {
          images: {
            take: 5,
            select: {
              id: true,
              url: true,
            },
          },
          host: {
            select: {
              id: true,
              ownerSince: true,
              firstName: true,
              lastName: true,
              imgUrl: true,
            },
          },

          amenities: {
            select: {
              name: true,
            },
          },
          labels: {
            select: {
              name: true,
            },
          },
          location: true,
          reviews: true,
          likes: true,
          bedrooms: {
            select: {
              beds: true,
              images: true,
            },
          },
        },
      });

      if (!stay) throw new Error("Stay not found");

      stay.rating =
        stay.reviews && stay.reviews.length > 0
          ? stay.reviews.reduce(
              (acc: number, curr: any) => acc + curr.rate,
              0
            ) / stay.reviews.length
          : 0;

      await setCache(cacheKey, stay);
    }
    return stay;
  } catch (error) {
    console.error("Failed to retrieve stay:", error);
    throw error;
  }
}

// export function stayToSmallStay(stay: Stay): StaySmall {
//   return {
//     id: stay.id,
//     type: stay.type,
//     image: stay.images[0]?.url || "",
//     price: stay.price,
//     locationId: stay.locationId,
//     location: stay.location,
//     rating:
//       stay.reviews && stay.reviews.length > 0
//         ? stay.reviews.reduce((acc, curr) => acc + curr.rate, 0) /
//           stay.reviews.length
//         : 0,
//   };
// }
