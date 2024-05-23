"use server";

// import { getCache, setCache } from "./cache";
import { prisma } from "@/prisma/prisma";
import StayPreview from "../components/ui/StayPreview/StayPreview";
import { FilterByModel } from "@/model/filters.model";
import { BedsType, StayModel, StaySmallModel } from "@/model/stay.model";
import { findFirstConsecutiveDaysAfterDate, getRating } from "./stay.service";
import { ReviewModel } from "@/model/review.model";
import { getCache, setCache } from "@/util/redis.util";
import { LocationModel } from "@/model/location.model";

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
    coordinates: {
      coordinates: number[];
      type: "Point";
    };
  };
  labels: string[];
  reviews: ReviewModel[];
  booking: {
    checkIn: any;
    checkOut: any;
  }[];
}

interface GeoJson {
  type: string;
  coordinates: [number, number];
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
    const mappedStays = queryStayToStallSmallJSX(stays);
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
        images: bedroom.images,
      };
    });
    const amenities = data.amenities.flatMap((amenity) => amenity.name);

    const { id, country, countryCode, city, address } = data.location;
    const coordinates = data.location.coordinates as unknown as GeoJson;

    const location: LocationModel = {
      lat: coordinates.coordinates[0],
      lng: coordinates.coordinates[1],
      id,
      country,
      countryCode,
      city,
      address,
    };

    const stay = {
      ...data,
      rating,
      location,
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
      location: {
        id: stay.location.id,
        city: stay.location.city,
        country: stay.location.country,
        address: stay.location.address,
        countryCode: stay.location.countryCode,
        lat: stay.location.coordinates.coordinates[0],
        lng: stay.location.coordinates.coordinates[1],
      },
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
      location: {
        id: stay.location.id,
        city: stay.location.city,
        country: stay.location.country,
        address: stay.location.address,
        countryCode: stay.location.countryCode,
        lat: stay.location.coordinates.coordinates[0],
        lng: stay.location.coordinates.coordinates[1],
      },
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
  page: number = 1
): Promise<QueryStay[]> => {
  try {
    // Build the query filters using the helper function
    const filterConditions = buildQueryFilters(searchBy);

    // Construct the raw SQL query
    const query = `
    WITH filtered_stays AS (
      SELECT 
        "Stay".id, 
        "Stay".type, 
        "Stay".name, 
        "Stay".images,
        "Stay".labels, 
        "Stay".price, 
        "Stay"."locationId"
      FROM 
        "Stay"
      JOIN 
        "Location" ON "Stay"."locationId" = "Location".id
      WHERE 1=1 ${filterConditions}
    ),
    locations AS (
      SELECT 
        "Location".id,
        "Location".country,
        "Location"."countryCode", 
        "Location".city,
        "Location".address,
        "Location".coordinates,
        "Location".id AS "locationId"
      FROM 
        "Location"
      WHERE "Location".id IN (SELECT "locationId" FROM filtered_stays)
    ),
    stay_reviews AS (
      SELECT 
        "Review"."stayId",
        json_agg(json_build_object('rate', "Review".rate, 'id', "Review".id, 'text', "Review".text, 'userId', "Review"."userId", 'stayId', "Review"."stayId")) AS reviews
      FROM 
        "Review"
        WHERE "Review"."stayId" IN (SELECT id FROM filtered_stays)
        GROUP BY "Review"."stayId"
    ),
    stay_bookings AS (
      SELECT 
        "Booking"."stayId",
        json_agg(json_build_object('checkIn', "Booking"."checkIn", 'checkOut', "Booking"."checkOut")) AS bookings
      FROM 
        "Booking"
      WHERE "Booking"."stayId" IN (SELECT id FROM filtered_stays)
      GROUP BY "Booking"."stayId"
    )
    SELECT 
      fs.*,
      json_build_object(
        'id', l.id,
        'country', l.country,
        'countryCode', l."countryCode",
        'city', l.city,
        'address', l.address,
        'coordinates', l.coordinates
      ) AS location,
      COALESCE(sr.reviews, '[]') AS reviews,
      COALESCE(sb.bookings, '[]') AS bookings
    FROM 
      filtered_stays fs
    JOIN 
      locations l ON fs."locationId" = l."locationId"
    LEFT JOIN 
      stay_reviews sr ON fs.id = sr."stayId"
    LEFT JOIN 
      stay_bookings sb ON fs.id = sb."stayId";
  `;
    // Execute the raw SQL query
    const stays = (await prisma.$queryRawUnsafe(query)) as QueryStay[];

    return stays;
  } catch (error) {
    throw new Error(`Failed to fetch stays: ${error}`);
  }
};

// Function to build the query filters based on the search criteria
// const buildQueryFilters = (searchBy?: FilterByModel) => {
//   // Initialize an empty filter object
//   const queryFilters: any = {
//     name: searchBy?.name ? { contains: searchBy.name } : undefined,
//     hostId: searchBy?.host,
//     booking: searchBy?.dates
//       ? {
//           // Filter out bookings that overlap with the provided dates
//           none: {
//             OR: [
//               {
//                 ...(searchBy.dates.start
//                   ? { checkIn: { lte: searchBy.dates.start } }
//                   : {}),
//                 ...(searchBy.dates.end
//                   ? { checkOut: { gte: searchBy.dates.end } }
//                   : {}),
//               },
//             ],
//           },
//         }
//       : undefined,
//     location: searchBy?.location
//       ? {
//           distance_box: {
//             center: { x: searchBy.location.lat, y: searchBy.location.lng },
//             radius: searchBy.location.radius,
//           },
//         }
//       : undefined,
//     labels: searchBy?.label ? { has: searchBy.label } : undefined,
//     entireHome:
//       searchBy?.type !== "AnyType"
//         ? searchBy?.type === "entireHome"
//           ? { equals: true }
//           : { equals: false }
//         : undefined, // Filter by entireHome if type is not "AnyType"

//     bedroomsAmount: searchBy?.bedroomsAmount
//       ? { lte: +searchBy.bedroomsAmount }
//       : undefined,
//     totalBeds: searchBy?.totalBeds ? { lte: +searchBy.totalBeds } : undefined,
//     baths: searchBy?.baths ? { lte: +searchBy.baths } : undefined,
//     price: searchBy?.priceRange
//       ? { lte: +searchBy.priceRange?.end, gte: +searchBy.priceRange?.start }
//       : undefined,
//     amenities:
//       searchBy?.amenities && searchBy.amenities.length
//         ? {
//             some: {
//               name: {
//                 in: searchBy.amenities,
//               },
//             },
//           }
//         : undefined,
//   };

//   // Remove any filters that are undefined
//   Object.keys(queryFilters).forEach(
//     (key) => queryFilters[key] === undefined && delete queryFilters[key]
//   );

//   return queryFilters;
// };

const buildQueryFilters = (searchBy?: FilterByModel) => {
  const additionalConditions = [];

  if (searchBy?.name) {
    additionalConditions.push(`name ILIKE '%${searchBy.name}%'`);
  }
  if (searchBy?.host) {
    additionalConditions.push(`"hostId" = '${searchBy.host}'`);
  }
  if (searchBy?.dates) {
    if (searchBy.dates.start || searchBy.dates.end) {
      additionalConditions.push(`
        NOT EXISTS (
          SELECT 1 FROM "Booking"
          WHERE "Booking"."locationId" = "Location"."id"
          AND (
            (${
              searchBy.dates.start
                ? `"checkIn" <= '${searchBy.dates.start}'`
                : "1=1"
            })
            AND 
            (${
              searchBy.dates.end
                ? `"checkOut" >= '${searchBy.dates.end}'`
                : "1=1"
            })
          )
        )
      `);
    }
  }
  if (searchBy?.label) {
    additionalConditions.push(
      `labels @> ARRAY['${searchBy.label}']::varchar[]`
    );
  }
  if (searchBy?.type && searchBy.type !== "AnyType") {
    additionalConditions.push(
      `"entireHome" = ${searchBy.type === "entireHome"}`
    );
  }
  if (searchBy?.bedroomsAmount) {
    additionalConditions.push(`"bedroomsAmount" <= ${searchBy.bedroomsAmount}`);
  }
  if (searchBy?.totalBeds) {
    additionalConditions.push(`"totalBeds" <= ${searchBy.totalBeds}`);
  }
  if (searchBy?.baths) {
    additionalConditions.push(`"baths" <= ${searchBy.baths}`);
  }
  if (searchBy?.priceRange) {
    additionalConditions.push(
      `"price" BETWEEN ${searchBy.priceRange.start || 1} AND ${
        searchBy.priceRange.end || 999999
      }`
    );
  }
  if (searchBy?.amenities && searchBy.amenities.length) {
    additionalConditions.push(
      `EXISTS (SELECT 1 FROM unnest(amenities) AS amenity WHERE amenity = ANY(ARRAY['${searchBy.amenities.join(
        "','"
      )}']))`
    );
  }

  if (searchBy?.location) {
    additionalConditions.push(`
      ST_DWithin(
        ST_SetSRID(ST_Point(${searchBy.location.lng}, ${searchBy.location.lat}), 4326)::geography,
        ST_SetSRID((coordinates->>'coordinates')::jsonb, 4326)::geography,
        ${searchBy.location.radius}
      )
    `);
  }

  const filterConditions =
    additionalConditions.length > 0
      ? `AND ${additionalConditions.join(" AND ")}`
      : "";

  return filterConditions;
};
