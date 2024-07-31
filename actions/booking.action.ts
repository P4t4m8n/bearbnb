"use server";
import "server-only";
import { dbService } from "@/db/db.service";
import {
  BookingDTO,
  BookingModel,
  BookingSchema,
  BookingStatus,
} from "@/model/booking.model";
import { ObjectId } from "mongodb";
import { buildBookingPipeline } from "@/db/pipelines/booking.pipeline";
import { BookingFilterModel } from "@/model/filters.model";
import { bookingValidation } from "@/db/dataValidation/validation";

export const getBookings = async (
  filter: BookingFilterModel
): Promise<BookingModel[]> => {
  const collection = await dbService.getCollection("bookings");
  const pipeline = buildBookingPipeline(filter);

  const bookings = await collection.aggregate(pipeline).toArray();

  const bookingsToReturn: BookingModel[] = bookings.map((booking) => ({
    _id: booking._id.toString(),
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    bookingTime: booking._id.getTimestamp(),
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

export const saveBooking = async (booking: BookingDTO): Promise<string> => {
  let bookingId: ObjectId;
  if (booking._id) bookingId = await _update(booking);
  else bookingId = await _create(booking);

  return bookingId.toString();
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
const _update = async (booking: BookingDTO): Promise<ObjectId> => {
  const collection = await dbService.getCollection("bookings");

  const result = await collection.updateOne(
    { _id: new ObjectId(booking._id) },
    { $set: booking }
  );

  if (!result.upsertedId) throw new Error("Update failed.");

  return result.upsertedId;
};

const _create = async (booking: BookingDTO): Promise<ObjectId> => {
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
    userId: new ObjectId(booking.userId),
    stayId: new ObjectId(booking.stayId),
    hostId: new ObjectId(booking.hostId),
  };

  const result = await collection.insertOne(bookingToSave);

  if (!result.insertedId) throw new Error("Insert failed.");

  return result.insertedId;
};
