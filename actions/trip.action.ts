import { dbService } from "@/db/db.service";
import { TripModel } from "@/model/trip.model";

export const getTripsByFilter = async (
  filter: Partial<TripModel>
): Promise<TripModel[]> => {
  const bookingCollection = await dbService.getCollection("bookings");

  const pipelineBooking = [
    {
      $match: {
        ...filter,
      },
    },
    {
      $lookup: {
        from: "stays",
        localField: "stayId",
        foreignField: "_id",
        as: "stay",
      },
    },
    {
      $unwind: "$stay",
    },
    {
      $lookup: {
        from: "locations",
        localField: "stay.locationId",
        foreignField: "_id",
        as: "location",
      },
    },
    {
      $unwind: "$location",
    },
    {
      $lookup: {
        from: "users",
        localField: "stay.hostId",
        foreignField: "_id",
        as: "host",
      },
    },
    {
      $unwind: "$host",
    },
    {
      $project: {
        bookingId: 1,
        image: "$stay.image",
        city: "$location.city",
        hostName: "$host.firstName",
        stayId: "$stay._id",
        reviewId: 1,
        checkIn: 1,
        checkOut: 1,
      },
    },
  ];

  const results = await bookingCollection.aggregate(pipelineBooking).toArray();

  if (results.length === 0) {
    return [];
  }

  const trips = results.map((result) => ({
    bookingId: result.bookingId,
    image: result.image,
    city: result.city,
    hostName: result.hostName,
    stayId: result.stayId,
    reviewId: result.reviewId,
    checkIn: result.checkIn,
    checkOut: result.checkOut,
  }));

  return trips;
};
