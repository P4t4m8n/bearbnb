"use server";

import { FilterByModel, SearchParamsModel } from "@/model/filters.model";
import { StayModel, StaySmallModel } from "@/model/stay.model";
import StayPreview from "@/components/StayPreview/StayPreview";
import {
  findFirstConsecutiveDaysAfterDate,
  getRating,
} from "@/service/stay.service";
import { dbService } from "@/db/db.service";
import { ObjectId } from "mongodb";
import { buildPipeline } from "@/db/pipelines";

const NUMBER_PER_PAGE = 12;

export const getSmallStaysJSX = async (
  searchParams?: SearchParamsModel,
  page?: number
): Promise<React.JSX.Element[]> => {
  try {
    const pipeline = buildPipeline(page || 1, NUMBER_PER_PAGE, searchParams);
    const stays = await _getSmallStaysData(pipeline);
    console.log("stays:", stays);

    if (!stays) throw new Error("Failed to fetch stays");

    const mappedStays = _queryStayToStallSmallJSXArr(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};

export const getSmallStays = async (
  searchParams?: SearchParamsModel,
  page?: number
): Promise<StaySmallModel[]> => {
  try {
    const pipeline = buildPipeline(page || 1, NUMBER_PER_PAGE, searchParams);

    const stays = await _getSmallStaysData(pipeline);

    if (!stays) throw new Error("Failed to fetch stays");

    const mappedStays = _queryStayToSmallStayArr(stays);
    return mappedStays;
  } catch (error) {
    console.error("Failed to fetch stays:", error);
    throw new Error(`Failed to fetch stays ${error}`);
  }
};

export const getStayById = async (id: string): Promise<StayModel> => {
  try {
    const collection = await dbService.getCollection("stays");

    const pipeline = [
      { $match: { _id: new ObjectId(id) } },
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
        $lookup: {
          from: "users",
          localField: "hostId",
          foreignField: "_id",
          as: "host",
        },
      },
      { $unwind: "$host" },
      {
        $lookup: {
          from: "highlights",
          localField: "highlights",
          foreignField: "_id",
          as: "highlights",
        },
      },
      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          images: 1,
          price: 1,
          location: {
            city: "$location.city",
            country: "$location.country",
            address: "$location.address",

            location: "$location.location.coordinates",
          },
          reviews: 1,
          booking: 1,
          host: {
            firstName: 1,
            lastName: 1,
            imgUrl: 1,
            ownerSince: 1,
          },
          capacity: 1,
          description: 1,
          bedRooms: 1,
          baths: 1,
          amenities: 1,
          highlights: {
            _id: { $toString: "$_id" },
            title: 1,
            icon: 1,
            description: 1,
          },
          likes: 1,
          entireHome: 1,
        },
      },
      { $limit: 1 },
    ];
    const [stay] = await collection.aggregate<StayModel>(pipeline).toArray();

    if (!stay) throw new Error("Failed to fetch stay");

    stay.firstAvailableDate = findFirstConsecutiveDaysAfterDate(
      new Date(),
      stay.bookings as { checkIn: Date; checkOut: Date }[],
      3
    );
    return stay;
  } catch (error) {
    console.error("Failed to fetch stay:", error);
    throw new Error(`Failed to fetch stay ${error}`);
  }
};

export const getSmallStayById = async (id: string): Promise<StaySmallModel> => {
  try {
    const stay = await getStayById(id);

    return _queryStayToSmallStay(stay);
  } catch (error) {
    console.error("Failed to fetch stay:", error);
    throw new Error(`Failed to fetch stay ${error}`);
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
    type: queryStay.entireHome ? "entireHome" : "privateRoom",
    location: {
      city: queryStay.location.city,
      country: queryStay.location.country,
      lat: queryStay.location.location[0],
      lng: queryStay.location.location[1],
    },
    firstAvailableDate: findFirstConsecutiveDaysAfterDate(
      new Date(),
      queryStay.bookings as { checkIn: Date; checkOut: Date }[],
      3
    ),
    rating: getRating(queryStay.reviews),
  };
};

const _getSmallStaysData = async (pipeline: any[]): Promise<any[]> => {
  try {
    const collection = await dbService.getCollection("stays");
    const stays = await collection.aggregate(pipeline).toArray();

    return stays;
  } catch (error) {
    throw new Error(`Failed to fetch stays: ${error}`);
  }
};
