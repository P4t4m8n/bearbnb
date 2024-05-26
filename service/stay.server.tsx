"use server";
// import { getCache, setCache } from "./cache";
import { prisma } from "@/prisma/prisma";
import StayPreview from "../components/ui/StayPreview/StayPreview";
import { FilterByModel } from "@/model/filters.model";
import { BedsType, StayModel, StaySmallModel } from "@/model/stay.model";
import { findFirstConsecutiveDaysAfterDate, getRating } from "./stay.service";
import { ReviewModel } from "@/model/review.model";
import { getCache, setCache } from "@/util/redis.util";
import { LocationModel, LocationSmallModel } from "@/model/location.model";
import { calculateDistance } from "./locations.service";

export interface QueryStay {
  id: string;
  type: string;
  name: string;
  images: string[];
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
//****************public functions*****************//
// Fetches a list of stays and converts them into JSX elements.
// This function takes optional filters and a pagination page number.
export async function getSmallStaysJSX(
  filters?: FilterByModel,
  page?: number
): Promise<React.JSX.Element[]> {
  // const cacheStays = await getCache("stays");
  // if (cacheStays && cacheStays.length) {
  //   return cacheStays;
  // }
  try {
    const stays = await getSmallStaysData(filters, page);

    if (!stays) throw new Error("Failed to fetch stays");

    // Convert stay data to JSX elements using a helper function.
    const mappedStays = queryStayToStallSmallJSXArr(stays);
    // setCache("stays", mappedStays);
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

    const mappedStays = queryStayToSmallStayArr(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};
//Retrieves minimal information stay
export async function getSmallStayById(
  stayId: string
): Promise<StaySmallModel> {
  try {
    const data = await prisma.stay.findFirstOrThrow({
      where: { id: stayId },
      include: {
        location: true,
        reviews: true,
      },
    });

    // Calculate the overall rating from reviews and the first available booking date.
    const rating = getRating(data.reviews);

    const stay = {
      ...data,
      rating,
      baths: data.baths || 0,
    };
    return stay;
  } catch (error) {
    console.error("Failed to retrieve stay:", error);
    throw error;
  }
}
// Retrieves detailed information about a stay by its ID,
//including related data like images, reviews, and amenities.
export async function getStayById(stayId: string): Promise<StayModel> {
  try {
    const data = await prisma.stay.findUnique({
      where: { id: stayId },
      include: {
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
        images: bedroom.images,
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
export const queryStayToStallSmallJSXArr = (
  queryStay: QueryStay[]
): React.JSX.Element[] => {
  return queryStay.map((stay: QueryStay) => {
    const staySmall: StaySmallModel = queryStayToSmallStay(stay);

    return <StayPreview key={staySmall.id} stay={staySmall} />;
  });
};
export const queryStayToSmallStayArr = (
  queryStay: QueryStay[]
): StaySmallModel[] => {
  return queryStay.map((stay: QueryStay) => {
    return queryStayToSmallStay(stay);
  });
};
//****************private functions*****************//
// Converts a query stay result into a StaySmallModel object.
const queryStayToSmallStay = (queryStay: QueryStay): StaySmallModel => {
  return {
    id: queryStay.id,
    name: queryStay.name,
    type: queryStay.type,
    images: queryStay.images,
    price: queryStay.price,
    location: {
      id: queryStay.location.id,
      city: queryStay.location.city,
      country: queryStay.location.country,
      address: queryStay.location.address,
      countryCode: queryStay.location.countryCode,
      lat: queryStay.location.lat,
      lng: queryStay.location.lng,
    },
    firstAvailableDate: findFirstConsecutiveDaysAfterDate(
      new Date(),
      queryStay.booking,
      3
    ),
    rating: getRating(queryStay.reviews),
  };
};
// Fetches a list of stays based on specified filters and pagination, returning the raw query data.
const getSmallStaysData = async (
  searchBy?: FilterByModel,
  page: number = 1 // Default page number is 0 if not provided
): Promise<QueryStay[]> => {
  try {
    // Build the query filters using the helper function
    const queryFilters = buildQueryFilters(searchBy);

    // Execute the Prisma query to fetch stays with the specified filters and pagination
    let stays = await prisma.stay.findMany({
      skip: page * NUMBER_PER_PAGE, // Skip records based on the page number and items per page
      take: NUMBER_PER_PAGE, // Limit the number of records fetched to the items per page
      where: queryFilters, // Apply the constructed query filters
      select: {
        // Select specific fields to return
        id: true,
        type: true,
        name: true,
        images: true,
        labels: true,
        price: true,
        locationId: true,
        location: true,
        reviews: true,
        booking: {
          select: {
            checkIn: true,
            checkOut: true,
          },
        },
      },
    });

    if (searchBy?.location) {
      stays = filterByDistance(
        stays,
        searchBy.location.coords,
        searchBy.location.radius || 100
      );
    }

    return stays;
  } catch (error) {
    throw new Error(`Failed to fetch stays: ${error}`);
  }
};
// Function to build the query filters based on the search criteria
const buildQueryFilters = (searchBy?: FilterByModel) => {
  // Initialize an empty filter object
  const queryFilters: any = {
    name: searchBy?.name ? { contains: searchBy.name } : undefined,
    hostId: searchBy?.host,
    booking: searchBy?.dates
      ? {
          // Filter out bookings that overlap with the provided dates
          none: {
            OR: [
              {
                ...(searchBy.dates.start
                  ? { checkIn: { lte: searchBy.dates.start } }
                  : {}),
                ...(searchBy.dates.end
                  ? { checkOut: { gte: searchBy.dates.end } }
                  : {}),
              },
            ],
          },
        }
      : undefined,
    labels: searchBy?.label ? { has: searchBy.label } : undefined,
    entireHome:
      searchBy?.type !== "AnyType"
        ? searchBy?.type === "entireHome"
          ? { equals: true }
          : { equals: false }
        : undefined, // Filter by entireHome if type is not "AnyType"

    bedroomsAmount: searchBy?.bedroomsAmount
      ? { lte: +searchBy.bedroomsAmount }
      : undefined,
    totalBeds: searchBy?.totalBeds ? { lte: +searchBy.totalBeds } : undefined,
    baths: searchBy?.baths ? { lte: +searchBy.baths } : undefined,
    price: searchBy?.priceRange
      ? { lte: +searchBy.priceRange?.end, gte: +searchBy.priceRange?.start }
      : undefined,
    amenities:
      searchBy?.amenities && searchBy.amenities.length
        ? {
            some: {
              name: {
                in: searchBy.amenities,
              },
            },
          }
        : undefined,
  };

  // Remove any filters that are undefined
  Object.keys(queryFilters).forEach(
    (key) => queryFilters[key] === undefined && delete queryFilters[key]
  );

  return queryFilters;
};
// Filter stays by distance from a specified location within a radius
const filterByDistance = (
  queryStays: QueryStay[],
  coords: LocationSmallModel,
  radius: number
): QueryStay[] => {
  return queryStays.filter((queryStay) => {
    const stayCoords = {
      lat: queryStay.location.lat,
      lng: queryStay.location.lng,
    };
    return calculateDistance(stayCoords, coords) <= radius;
  });
};
