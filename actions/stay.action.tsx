"use server";

import { FilterByModel } from "@/model/filters.model";
import { StaySmallModel } from "@/model/stay.model";
import StayPreview from "@/components/StayPreview/StayPreview";
import {
  findFirstConsecutiveDaysAfterDate,
  getRating,
} from "@/service/stay.service";
import { dbService } from "@/db/db.service";

const NUMBER_PER_PAGE = 8;

export const getSmallStaysJSX = async (
  filters?: FilterByModel,
  page?: number
): Promise<React.JSX.Element[]> => {
  try {
    const stays = await _getSmallStaysData(filters, page);

    if (!stays) throw new Error("Failed to fetch stays");

    const mappedStays = _queryStayToStallSmallJSXArr(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};

export const getSmallStays = async (
  filters: FilterByModel,
  page?: number
): Promise<StaySmallModel[]> => {
  try {
    const stays = await _getSmallStaysData(filters, page);

    if (!stays) throw new Error("Failed to fetch stays");

    const mappedStays = _queryStayToSmallStayArr(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};

///////////////////// Private Functions /////////////////////
const _queryStayToStallSmallJSXArr = (
  queryStay: any[]
): React.JSX.Element[] => {
  return queryStay.map((stay: any) => {
    const staySmall: StaySmallModel = _queryStayToSmallStay(stay);

    return <StayPreview key={staySmall._id} stay={staySmall} />;
  });
};

const _queryStayToSmallStayArr = (queryStay: any[]): StaySmallModel[] => {
  return queryStay.map((stay: any) => {
    return _queryStayToSmallStay(stay);
  });
};

const _queryStayToSmallStay = (queryStay: any): StaySmallModel => {
  return {
    _id: queryStay._id.toString(),
    name: queryStay.name,
    images: queryStay.images,
    price: queryStay.price,
    location: {
    city: queryStay.location.city,
    country: queryStay.location.country,
    lat: queryStay.location.location[0],
    lng: queryStay.location.location[1],
    },
    firstAvailableDate: findFirstConsecutiveDaysAfterDate(
      new Date(),
      queryStay.booking as { checkIn: Date; checkOut: Date }[],
      3
    ),
    rating: getRating(queryStay.reviews),
  };
};

const _getSmallStaysData = async (
  searchBy?: FilterByModel,
  page: number = 1
): Promise<any[]> => {
  try {
    const queryFilters = _buildQueryFilters(searchBy);

    const pipeline = [
      { $match: queryFilters },
      { $skip: page * NUMBER_PER_PAGE },
      { $limit: NUMBER_PER_PAGE },
      {
        $lookup: {
          from: "locations",
          localField: "locationId",
          foreignField: "_id",
          as: "location",
        },
      },
      { $unwind: "$location" },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "stayId",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "stayId",
          as: "booking",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          price: 1,
          location: {
            city: "$location.city",
            country: "$location.country",
            location: "$location.location.coordinates",
         
          },
          reviews: 1,
          booking: 1,
        },
      },
    ];
    const collection = await dbService.getCollection("stays");
    const stays = await collection.aggregate(pipeline).toArray();

    return stays;
  } catch (error) {
    throw new Error(`Failed to fetch stays: ${error}`);
  }
};

const _buildQueryFilters = (searchBy?: FilterByModel) => {
  const queryFilters: any = {};

  if (searchBy?.name) {
    queryFilters.name = { $regex: searchBy.name, $options: "i" };
  }

  if (searchBy?.host) {
    queryFilters.hostId = searchBy.host;
  }

  if (searchBy?.dates) {
    queryFilters["booking"] = {
      $not: {
        $elemMatch: {
          checkIn: { $lte: searchBy.dates.end },
          checkOut: { $gte: searchBy.dates.start },
        },
      },
    };
  }

  if (searchBy?.label) {
    queryFilters.labels = searchBy.label;
  }

  if (searchBy?.type && searchBy.type !== "AnyType") {
    queryFilters.entireHome = searchBy.type === "entireHome";
  }

  if (searchBy?.bedroomsAmount) {
    queryFilters.bedroomsAmount = { $gte: searchBy.bedroomsAmount };
  }

  if (searchBy?.totalBeds) {
    queryFilters.totalBeds = { $gte: searchBy.totalBeds };
  }

  if (searchBy?.baths) {
    queryFilters.baths = { $gte: searchBy.baths };
  }

  if (searchBy?.priceRange) {
    queryFilters.price = {
      $gte: searchBy.priceRange.start,
      $lte: searchBy.priceRange.end,
    };
  }

  if (searchBy?.amenities && searchBy.amenities.length > 0) {
    queryFilters.amenities = { $all: searchBy.amenities };
  }

  return queryFilters;
};
