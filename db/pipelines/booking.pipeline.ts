import { BookingFilterModel } from "@/model/filters.model";
import { ObjectId } from "mongodb";

export const buildBookingPipeline = (filter: BookingFilterModel) => {
  const matchStage: {
    checkIn?: { $gte: Date; $lt: Date };
    status?: string;
    "host._id"?: ObjectId;
    "user._id"?: ObjectId;
    "stay._id"?: ObjectId;
    _id?: ObjectId;
  } = {};

  if (filter.dateRange) {
    matchStage.checkIn = {
      $gte: filter.dateRange.startDate,
      $lt: filter.dateRange.endDate,
    };
  }

  if (filter.status) {
    matchStage.status = filter.status;
  }

  if (filter.hostId) {
    matchStage["host._id"] = new ObjectId(filter.hostId);
  }

  if (filter.userId) {
    matchStage["user._id"] = new ObjectId(filter.userId);
  }

  if (filter.stayId) {
    matchStage["stay._id"] = new ObjectId(filter.stayId);
  }
  if (filter._id) {
    matchStage._id = new ObjectId(filter._id);
  }

  const pipeline = [
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: "stays",
        localField: "stay._id",
        foreignField: "_id",
        as: "stayDetails",
      },
    },
    {
      $unwind: {
        path: "$stayDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user._id",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "host._id",
        foreignField: "_id",
        as: "hostDetails",
      },
    },
    {
      $unwind: {
        path: "$hostDetails",
        preserveNullAndEmptyArrays: true,
      },
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
          _id: "$stayDetails._id",
          name: "$stayDetails.name",
          images: "$stayDetails.images",
          price: "$stayDetails.price",
          type: "$stayDetails.type",
        },
        user: {
          _id: "$userDetails._id",
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          email: "$userDetails.email",
          isOwner: "$userDetails.isOwner",
          imgUrl: "$userDetails.imgUrl",
        },
        host: {
          _id: "$hostDetails._id",
          email: "$hostDetails.email",
          isOwner: "$hostDetails.isOwner",
          imgUrl: "$hostDetails.imgUrl",
          firstName: "$hostDetails.firstName",
          lastName: "$hostDetails.lastName",
        },
      },
    },
  ];

  return pipeline;
};
