import { SearchParamsModel } from "@/model/filters.model";

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

  // Calculate the bounding box for the given distance
  const earthRadius = 6378137;
  const latDelta = distance / earthRadius;
  const lonDelta = distance / (earthRadius * Math.cos((Math.PI * lat) / 180));

  const minLat = lat - (latDelta * 180) / Math.PI;
  const maxLat = lat + (latDelta * 180) / Math.PI;
  const minLon = lng - (lonDelta * 180) / Math.PI;
  const maxLon = lng + (lonDelta * 180) / Math.PI;

  return {
    $match: {
      "location.location.coordinates": {
        $geoWithin: {
          $box: [
            [minLon, minLat],
            [maxLon, maxLat],
          ],
        },
      },
    },
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

export const buildPipeline = (
  page: number,
  itemsPerPage: number,
  searchParams?: SearchParamsModel
) => {
  const pipeline: any[] = [...getLocationLookupPipeline()];

  if (searchParams?.location) {
    pipeline.push(
      getGeoWithinPipeline(
        searchParams.location,
        searchParams?.distance ? +searchParams.distance : 100000
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
        bookings: 1,
      },
    }
  );

  return pipeline;
};
