import { dbService } from "@/db/db.service";
import { TripModel } from "@/model/trip.model";

// export const getTripsByFilter = async (filter: string): Promise<TripModel> => {
//   const bookingCollocation = await dbService.getCollection("bookings");
//   const stayCollocation = await dbService.getCollection("stays");

//   const pipelineBooking = [
//     {
//       $lookup: {
//         from: "bookings",
//         localField: "bookingId",
//         foreignField: "bookingId",
//         as: "booking",
//       },
//     },
//     {
//       $unwind: "$booking",
//     },

//     {
//       $project: {
//         bookingId: 1,
//         stayId: 1,
//         reviewId: 1,
//         checkIn: 1,
//         checkOut: 1,
//       },
//     },
//   ];

//   const stayPipeline = [
//     {
//       $lookup: {
//         from: "stays",
//         localField: "stayId",
//         foreignField: "stayId",
//         as: "stay",
//       },
//     },
//     {
//       $unwind: "$stay",
//     },
//     {
//       $lookup: {
//         from: "locations",
//         localField: "stay.locationId",
//         foreignField: "_id",
//         as: "location",
//       },
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "stay.hostId",
//         foreignField: "_id",
//         as: "host",
//       },
//     },

//     {
//       $project: {
//         bookingId: 1,
//         image: "$stay.image",
//         city: 1,
//         hostName: "$host.firstName",
//         stayId: 1,
//         reviewId: 1,
//         checkIn: "$booking.checkIn",
//         checkOut: "$booking.checkOut",
//       },
//     },
//   ];

//   const [booking] = await bookingCollocation
//     .aggregate(pipelineBooking)
//     .toArray();
//   const [stay] = await stayCollocation.aggregate(stayPipeline).toArray();
//   const trip = {
//     bookingId: booking.bookingId,
//     image: stay.image,
//     city: stay.city,
//     hostName: stay.hostName,
//     stayId: stay.stayId,
//     reviewId: stay.reviewId,
//     checkIn: booking.checkIn,
//     checkOut: booking.checkOut,
//   };

//   return trip;
// };

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
