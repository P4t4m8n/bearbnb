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
  booking: {
    checkIn: any;
    checkOut: any;
  }[];
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
    if (filters?.dates?.start && filters.dates.start && filters?.dates?.end) {
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
    // console.log("queryFilters:", filters?.dates.start);

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
        booking: {
          select: {
            checkIn: true,
            checkOut: true,
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
      firstAvailableDate: findFirstThreeConsecutiveDaysAfterDate(
        new Date(),
        stay.booking
      ),
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
        stay.firstAvailableDate = findFirstThreeConsecutiveDaysAfterDate(new Date(),stay.booking)

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

function findFirstThreeConsecutiveDaysAfterDate(
  targetDate: Date,
  bookings: { checkIn: Date; checkOut: Date }[]
): Date[] {
  // Helper to add days to a date
  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Helper to check if a date is within any booking intervals
  function isDateAvailable(
    date: Date,
    bookings: { checkIn: Date; checkOut: Date }[]
  ): boolean {
    return !bookings.some(
      (booking) => date >= booking.checkIn && date <= booking.checkOut
    );
  }

  // Start searching from the day after the target date
  let currentDate = addDays(targetDate, 1);

  // Loop until we find three consecutive available days
  while (true) {
    if (
      isDateAvailable(currentDate, bookings) &&
      isDateAvailable(addDays(currentDate, 1), bookings) &&
      isDateAvailable(addDays(currentDate, 2), bookings)
    ) {
      // Return the sequence of three available days as an array
      return [currentDate, addDays(currentDate, 1), addDays(currentDate, 2)];
    }

    // Move to the next day and repeat the check
    currentDate = addDays(currentDate, 1);
  }
}
