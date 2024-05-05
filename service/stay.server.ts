import { prisma } from "@/prisma/prisma";
import { SearchBY, Stay, StaySmall } from "../model/stay.model";
import { getCache, setCache } from "./cache";

interface QueryStay {
  id: string;
  type: string;
  images: { url: string }[];
  price: number;
  locationId: string;
  location: {
    id: string;
    country: string;
    countryCode: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  reviews: { rate: number }[];
}

export async function getSmallStays(
  filters?: SearchBY
): Promise<StaySmall[] | undefined> {
  "use server";
  try {
    // Build dynamic where clause based on filters
    const queryFilters: any = {};
    if (filters?.name) queryFilters.name = filters.name;
    // if (filters?.priceRange.start && filters.priceRange.end)
    //   queryFilters.price = {
    //     lte: filters?.priceRange.start,
    //     gte: filters?.priceRange.end,
    //   };
    if ((filters?.dates?.start && filters.dates.start) && filters?.dates?.end) {
      queryFilters.booking = {
        none: {
          OR: [
            {
              checkIn: { lte: filters.dates.start },
              checkOut: { gte: filters.dates.end },
            },
          ],
        },
      };
    }
    console.log("queryFilters:", filters?.dates.start);

    const stays = await prisma.stay.findMany({
      where: queryFilters,
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
    const mappedStays = stays.map((stay: QueryStay) => ({
      id: stay.id,
      type: stay.type,
      image: stay.images[0]?.url || "",
      price: stay.price,
      locationId: stay.locationId,
      location: stay.location,
      rating:
        stay.reviews && stay.reviews.length > 0
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

export async function getStayById(stayId: string): Promise<Stay> {
  const cacheKey: string = "details";

  try {
   
    const stay = (await prisma.stay.findUnique({
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
        booking: {
          select: {
            id: true,
            checkIn: true,
            checkOut: true,
          },
        },
      },
    })) as unknown as Stay;

    if (!stay) throw new Error("Stay not found");
    stay.rating =
      stay.reviews && stay.reviews.length > 0
        ? stay.reviews.reduce((acc: number, curr: any) => acc + curr.rate, 0) /
          stay.reviews.length
        : 0;

    // await setCache(cacheKey, stay);
    // }
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
