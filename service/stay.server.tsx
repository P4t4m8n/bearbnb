"use server";

// import { getCache, setCache } from "./cache";
import { prisma } from "@/prisma/prisma";
import StayPreview from "../components/ui/StayPreview/StayPreview";
import { FilterByModel } from "@/model/filters.model";
import { BedsType, StayModel, StaySmallModel } from "@/model/stay.model";
import { findFirstConsecutiveDaysAfterDate, getRating } from "./stay.service";
import { ReviewModel } from "@/model/review.model";

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
  labels: string[];
  reviews: ReviewModel[];
  booking: {
    checkIn: any;
    checkOut: any;
  }[];
}
//pagination
const NUMBER_PER_PAGE = 8;
// Fetches a list of stays and converts them into JSX elements.
// This function takes optional filters and a pagination page number.
export async function getSmallStaysJSX(
  filters?: FilterByModel,
  page?: number
): Promise<React.JSX.Element[]> {
  try {
    const stays = await getSmallStaysData(filters, page);

    if (!stays) throw new Error("Failed to fetch stays");

    // Convert stay data to JSX elements using a helper function.
    const mappedStays = queryStayToStallSmallJSX(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
}
//Fetches a list of stays and converts them into an array of StaySmallModel objects.
export const getSmallStays = async (
  filters?: FilterByModel,
  page?: number
): Promise<StaySmallModel[]> => {
  try {
    const stays = await getSmallStaysData(filters, page);

    if (!stays) throw new Error("Failed to fetch stays");

    // Convert stay data to JSX elements using a helper function.
    const mappedStays = queryStayToSmallStay(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};
// Retrieves detailed information about a stay by its ID,
//including related data like images, reviews, and amenities.
export async function getStayById(stayId: string): Promise<StayModel> {
  try {
    const data = await prisma.stay.findUnique({
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
            isOwner: true,
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

        location: true,
        reviews: {
          select: {
            id: true,
            rate: true,
            text: true,
            userId: true,
            stayId: true,
          },
        },
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
            id: true,
            title: true,
            description: true,
            icon: true,
          },
        },
      },
    });

    if (!data) throw new Error("Stay not found");

    // Calculate the overall rating from reviews and the first available booking date.
    const rating = getRating(data.reviews);
    const firstAvailableDate = findFirstConsecutiveDaysAfterDate(
      new Date(),
      data.booking as { checkIn: Date; checkOut: Date }[],
      3
    );

    // Format the bedroom data and map amenities and labels.
    const bedrooms = data.bedrooms.map((bedroom) => {
      return {
        beds: bedroom.beds.flatMap((bed) => bed as BedsType),
        images: bedroom.images.map((image) => image.url),
      };
    });
    const amenities = data.amenities.flatMap((amenity) => amenity.name);

    const stay = {
      ...data,
      rating,
      firstAvailableDate,
      amenities,
      baths: data.baths || 0,
      bedrooms,
      bookings: data.booking,
    };
    return stay;
  } catch (error) {
    console.error("Failed to retrieve stay:", error);
    throw error;
  }
}
// Converts an array of stay query results into an array of JSX elements for display.
export const queryStayToStallSmallJSX = (
  queryStay: QueryStay[]
): React.JSX.Element[] => {
  return queryStay.map((stay: QueryStay) => {
    const staySmall: StaySmallModel = {
      id: stay.id,
      name: stay.name,
      type: stay.type,
      images: stay.images,
      price: stay.price,
      location: stay.location,
      firstAvailableDate: findFirstConsecutiveDaysAfterDate(
        new Date(),
        stay.booking,
        3
      ),
      rating: getRating(stay.reviews),
    };
    return <StayPreview key={staySmall.id} stay={staySmall} />;
  });
};
export const queryStayToSmallStay = (
  queryStay: QueryStay[]
): StaySmallModel[] => {
  return queryStay.map((stay: QueryStay) => {
    return {
      id: stay.id,
      name: stay.name,
      type: stay.type,
      images: stay.images,
      price: stay.price,
      location: stay.location,
      firstAvailableDate: findFirstConsecutiveDaysAfterDate(
        new Date(),
        stay.booking,
        3
      ),
      rating: getRating(stay.reviews),
    };
  });
};

//****************private functions*****************//

// Fetches a list of stays based on specified filters and pagination, returning the raw query data.
const getSmallStaysData = async (
  searchBy?: FilterByModel,
  page?: number
): Promise<QueryStay[]> => {
  try {
    // Build dynamic where clause based on filters
    const queryFilters: any = {};
    if (searchBy?.name) queryFilters.name = searchBy.name;
    if (searchBy?.host) queryFilters.hostId = searchBy.host;
    if (searchBy?.dates?.start && searchBy?.dates?.end) {
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
    if (searchBy?.label) queryFilters.labels = { has: searchBy.label };

    console.log("queryFilters:", queryFilters);
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
        labels: true,
        price: true,
        locationId: true,
        location: true,
        reviews: {
          select: {
            rate: true,
            id: true,
            text: true,
            userId: true,
            stayId: true,
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
    return stays;
  } catch (error) {
    throw new Error(`Failed to fetch stays ${error}`);
  }
};
