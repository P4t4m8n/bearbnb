"use server";

import { prisma } from "@/prisma/prisma";
import { SearchBY, Stay, StaySmall } from "../model/stay.model";
import { getCache, setCache } from "./cache";
import StayPreview from "../components/ui/StayPreview/StayPreview";
import { findFirstConsecutiveDaysAfterDate } from "./util";

export interface QueryStay {
  id: string;
  type: string;
  name: string;
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

const NUMBER_PER_PAGE = 8;
export async function getSmallStaysJSX(
  filters?: SearchBY,
  page?: number
): Promise<React.JSX.Element[] | undefined> {
  try {
    const stays = await getSmallStaysData(filters, page);
    if (!stays) throw new Error("Failed to fetch stays");
    const mappedStays = queryStayToStallSmallJSX(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    return undefined;
  }
}

export async function getStayById(stayId: string): Promise<Stay> {
  "use server";
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
        highlights: {
          select: {
            title: true,
            description: true,
            icon: true,
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

    stay.firstAvailableDate = findFirstConsecutiveDaysAfterDate(
      new Date(),
      stay.booking as { checkIn: Date; checkOut: Date }[],
      3
    );

    // await setCache(cacheKey, stay);
    // }
    return stay;
  } catch (error) {
    console.error("Failed to retrieve stay:", error);
    throw error;
  }
}

const getSmallStaysData = async (
  searchBy?: SearchBY,
  page?: number
): Promise<QueryStay[] | undefined> => {
  const cacheKey: string = "stays";

  try {
    // Build dynamic where clause based on filters
    const queryFilters: any = {};
    if (searchBy?.name) queryFilters.name = searchBy.name;
    if (searchBy?.host) queryFilters.hostId = searchBy.host;
    if (
      searchBy?.dates?.start &&
      searchBy.dates.start &&
      searchBy?.dates?.end
    ) {
      queryFilters.booking = {
        none: {
          OR: [
            {
              checkIn: { lte: searchBy.dates.start },
              checkOut: { gte: searchBy.dates.end },
            },
          ],
        },
      };
    }

    const stays = await prisma.stay.findMany({
      skip: (page || 0) * NUMBER_PER_PAGE,
      take: NUMBER_PER_PAGE,
      where: queryFilters,
      select: {
        id: true,
        type: true,
        name: true,
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
    // setCache(cacheKey, stays);
    return stays;
  } catch (error) {
    console.error("error:", error);
  }
};

export const queryStayToStallSmallJSX = (
  queryStay: QueryStay[]
): React.JSX.Element[] => {
  return queryStay.map((stay: QueryStay) => {
    const staySmall: StaySmall = {
      id: stay.id,
      name: stay.name,
      type: stay.type,
      image: stay.images[0]?.url || "",
      price: stay.price,
      locationId: stay.locationId,
      location: stay.location,
      firstAvailableDate: findFirstConsecutiveDaysAfterDate(
        new Date(),
        stay.booking,
        3
      ),
      rating:
        stay.reviews && stay.reviews.length > 0
          ? stay.reviews.reduce((acc, curr) => acc + curr.rate, 0) /
            stay.reviews.length
          : 0,
    };
    return <StayPreview key={staySmall.id} stay={staySmall} />;
  });
};
