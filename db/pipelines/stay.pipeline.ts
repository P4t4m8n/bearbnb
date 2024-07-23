import { SearchParamsModel } from "@/model/filters.model";
import { ObjectId } from "mongodb";

const getLocationLookupPipeline = () => [
  {
    $lookup: {
      from: "locations",
      localField: "locationId",
      foreignField: "_id",
      as: "location",
    },
  },
  { $unwind: "$location" },
];

const getGeoWithinPipeline = (location: string, distance: number) => {
  const [lat, lng] = location.split(",").map(Number);

  // Convert distance from kilometers to radians
  const earthRadiusInKm = 6378.137;
  const distanceInRadians = distance / earthRadiusInKm;

  return {
    $match: {
      "location.location.coordinates": {
        $geoWithin: {
          $centerSphere: [[lng, lat], distanceInRadians]
        }
      }
    }
  };
};

const getBookingLookupPipeline = () => ({
  $lookup: {
    from: "bookings",
    localField: "_id",
    foreignField: "stayId",
    as: "bookings",
  },
});

const getDateFilterPipeline = (startDate: Date, endDate: Date) => ({
  $match: {
    $or: [
      { bookings: { $eq: [] } },
      {
        bookings: {
          $not: {
            $elemMatch: {
              $or: [
                { checkIn: { $lt: endDate, $gt: startDate } },
                { checkOut: { $lt: endDate, $gt: startDate } },
                { checkIn: { $lte: startDate }, checkOut: { $gte: endDate } },
              ],
            },
          },
        },
      },
    ],
  },
});

const getPaginationPipeline = (page: number, itemsPerPage: number) => [
  { $skip: (page - 1) * itemsPerPage },
  { $limit: itemsPerPage },
];

const getReviewsLookupPipeline = () => ({
  $lookup: {
    from: "reviews",
    localField: "_id",
    foreignField: "stayId",
    as: "reviews",
  },
});

export const buildStayPipeline = (
  page: number,
  itemsPerPage: number,
  searchParams?: SearchParamsModel
) => {
  const pipeline: any[] = [...getLocationLookupPipeline()];

  if (searchParams?.location) {
    pipeline.push(
      getGeoWithinPipeline(
        searchParams.location,
        searchParams?.distance ? +searchParams.distance : 100
      )
    );
  }

  pipeline.push(getBookingLookupPipeline());

  if (searchParams?.startDate && searchParams?.endDate) {
    pipeline.push(
      getDateFilterPipeline(
        new Date(searchParams.startDate),
        new Date(searchParams.endDate)
      )
    );
  }

  if (searchParams?.priceRange) {
    const [start, end] = searchParams.priceRange.split(",");
    pipeline.push({
      $match: {
        price: {
          $gte: +start,
          $lte: +end,
        },
      },
    });
  }

  if (searchParams?.bedroomsAmount) {
    pipeline.push({
      $match: {
        $expr: { $eq: [{ $size: "$bedRooms" }, +searchParams.bedroomsAmount] },
      },
    });
  }

  if (searchParams?.totalBeds) {
    pipeline.push({
      $match: {
        $expr: { $eq: [{ $sum: "$bedRooms.beds" }, +searchParams.totalBeds] },
      },
    });
  }

  if (searchParams?.baths) {
    pipeline.push({
      $match: {
        baths: {
          $gte: +searchParams.baths,
        },
      },
    });
  }

  if (searchParams?.type === "entireHome") {
    pipeline.push({
      $match: {
        entireHome: true,
      },
    });
  }

  if (searchParams?.type === "room") {
    pipeline.push({
      $match: {
        entireHome: false,
      },
    });
  }

  if (searchParams?.amenities) {
    const amenities = searchParams.amenities.split(",");
    pipeline.push({
      $match: {
        amenities: { $all: amenities },
      },
    });
  }

  if (searchParams?.label) {
    pipeline.push({
      $match: {
        labels: searchParams.label,
      },
    });
  }

  if (searchParams?.host) {
    pipeline.push({
      $match: {
        hostId: new ObjectId(searchParams.host),
      },
    });
  }

  pipeline.push(
    ...getPaginationPipeline(page, itemsPerPage),
    getReviewsLookupPipeline(),
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
        bookings: {
          _id: { $toString: "$_id" },
          checkIn: 1,
          checkOut: 1,
        },
      },
    }
  );

  return pipeline;
};
