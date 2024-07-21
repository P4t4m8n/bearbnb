"use server";

import { dbService } from "@/db/db.service";
import {
  BookingModel,
  BookingSchema,
  BookingStatus,
} from "@/model/booking.model";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { buildBookingPipeline } from "@/db/pipelines/booking.pipeline";
import { BookingFilterModel } from "@/model/filters.model";

const bookingValidation = z
  .object({
    id: z.string().optional(),
    stayId: z.string(),
    userId: z.string(),
    hostId: z.string(),
    status: z.enum(["pending", "confirmed", "canceled", "completed"]),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number." }),
    adults: z
      .number()
      .min(1, { message: "At least one adult must be specified." }),
    children: z.number().min(0).default(0),
    infants: z.number().min(0).default(0),
    pets: z.number().min(0).default(0),
    checkIn: z.date(),
    checkOut: z.date(),
    bookingTime: z.date(),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: "Check-in date must be before check-out date.",
  });

export const getBookingByFilter = async (
  filter: BookingFilterModel
): Promise<BookingModel[]> => {
  const collection = await dbService.getCollection("bookings");
  const pipeline = buildBookingPipeline(filter);

  const bookings = await collection.aggregate(pipeline).toArray();

  const bookingsToReturn: BookingModel[] = bookings.map((booking) => ({
    _id: booking._id.toString(),
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    bookingTime: booking.bookingTime,
    price: booking.price,
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
    stay: { ...booking.stay, _id: booking.stay._id.toString() },
    user: { ...booking.user, _id: booking.user._id.toString() },
    host: { ...booking.host, _id: booking.host._id.toString() },
    status: booking.status as BookingStatus,
  }));

  return bookingsToReturn;
};

export const saveBooking = async (
  booking: BookingModel
): Promise<BookingModel> => {
  let bookingId: ObjectId;
  if (booking._id) {
    bookingId = await _update(booking);
  } else bookingId = await _create(booking);

  return {
    ...booking,
    _id: bookingId.toString(),
    bookingTime: bookingId.getTimestamp(),
  };
};

export const getBookingById = async (_id: string): Promise<BookingModel> => {
  const collection = await dbService.getCollection("bookings");
  const pipeline = buildBookingPipeline({ _id });

  const [result] = await collection.aggregate(pipeline).toArray();

  if (!result) throw new Error("Booking not found.");

  return {
    _id: result._id.toString(),
    stay: result.stay,
    user: result.user,
    host: result.host,
    status: result.status as BookingStatus,
    price: result.price,
    adults: result.adults,
    children: result.children,
    infants: result.infants,
    pets: result.pets,
    checkIn: result.checkIn,
    checkOut: result.checkOut,
    bookingTime: result._id.getTimestamp(),
  };
};

////////////////// Private functions //////////////////
const _update = async (booking: BookingModel): Promise<ObjectId> => {
  const collection = await dbService.getCollection("bookings");

  const result = await collection.updateOne(
    { _id: new ObjectId(booking._id) },
    { $set: booking }
  );

  if (!result.upsertedId) throw new Error("Update failed.");

  return result.upsertedId;
};

const _create = async (booking: BookingModel): Promise<ObjectId> => {
  const collection = await dbService.getCollection("bookings");

  bookingValidation.parse(booking);

  const bookingToSave: BookingSchema = {
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    price: booking.price,
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
    status: booking.status,
    userId: new ObjectId(booking.user._id),
    stayId: new ObjectId(booking.stay._id),
    hostId: new ObjectId(booking.host._id),
  };

  const result = await collection.insertOne(bookingToSave);

  if (!result.insertedId) throw new Error("Insert failed.");

  return result.insertedId;
};
