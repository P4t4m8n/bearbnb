import { BookingFilterModel } from "@/model/filters.model";
import { ObjectId } from "mongodb"; // Ensure this import is present

export const buildBookingPipeline = (filter: BookingFilterModel) => {
  const pipeline = [];

  if (filter.dateRange) {
    pipeline.push({
      $match: {
        checkIn: { $gte: new Date(filter.dateRange.startDate) },
        checkOut: { $lt: new Date(filter.dateRange.endDate) },
      },
    });
  }

  if (filter.status) {
    pipeline.push({ $match: { status: filter.status } });
  }

  if (filter.hostId) {
    pipeline.push({ $match: { hostId: new ObjectId(filter.hostId) } });
  }

  if (filter.userId) {
    pipeline.push({ $match: { userId: new ObjectId(filter.userId) } });
  }

  if (filter.stayId) {
    pipeline.push({ $match: { stayId: new ObjectId(filter.stayId) } });
  }

  if (filter._id) {
    pipeline.push({ $match: { _id: new ObjectId(filter._id) } });
  }

  pipeline.push(
    {
      $lookup: {
        from: "stays",
        localField: "stayId",
        foreignField: "_id",
        as: "stay",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
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
    {
      $unwind: "$stay",
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$host",
    },
    {
      $lookup: {
        from: "locations",
        localField: "stay.locationId",
        foreignField: "_id",
        as: "stay.location",
      },
    },
    {
      $unwind: "$stay.location",
    },
    {
      $project: {
        _id: 1,
        checkIn: 1,
        checkOut: 1,
        bookingTime: 1,
        price: 1,
        adults: 1,
        children: 1,
        infants: 1,
        pets: 1,
        status: 1,
        stay: {
          _id: "$stay._id",
          name: "$stay.name",
          image: { $arrayElemAt: ["$stay.images", 0] },
          price: "$stay.price",
          type: "$stay.type",
          location: {
            city: "$stay.location.city",
          },
        },
        user: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          email: "$user.email",
          isOwner: "$user.isOwner",
          imgUrl: "$user.imgUrl",
        },
        host: {
          _id: "$host._id",
          email: "$host.email",
          isOwner: "$host.isOwner",
          imgUrl: "$host.imgUrl",
          firstName: "$host.firstName",
          lastName: "$host.lastName",
        },
      },
    }
  );

  return pipeline;
};
