"use server";

import { dbService } from "@/db/db.service";
import {
  BookingModel,
  BookingStatus,
  BookingToSave,
} from "@/model/booking.model";
import { z } from "zod";

import { ObjectId } from "mongodb";

const bookingSchema = z
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
  filter: Partial<BookingModel>
): Promise<BookingModel[]> => {
  const collection = await dbService.getCollection("bookings");
  const bookings = (await collection
    .find({
      filter,
    })
    .toArray()) as unknown as BookingModel[];
  return bookings;
};

export const saveBooking = async (
  booking: Partial<BookingModel>
): Promise<BookingModel | null> => {
  if (booking._id) {
    return await _update(booking);
  } else return await _create(booking as BookingToSave);
};

export const getBookingById = async (
  id: string
): Promise<BookingModel | null> => {
  const collection = await dbService.getCollection("bookings");
  const data = await collection.findOne({ _id: new ObjectId(id) });
  if (!data) return null;
  return {
    _id: data._id!.toString(),
    stayId: data.stayId!.toString(),
    userId: data.userId!.toString(),
    hostId: data.hostId!.toString(),
    status: data.status as BookingStatus,
    price: data.price!,
    adults: data.adults,
    children: data.children,
    infants: data.infants,
    pets: data.pets,
    checkIn: data.checkIn!,
    checkOut: data.checkOut!,
    bookingTime: data.bookingTime!,
  };
};

////////////////// Private functions //////////////////
const _update = async (
  booking: Partial<BookingModel>
): Promise<BookingModel | null> => {
  const collection = await dbService.getCollection("bookings");
  const result = await collection.updateOne(
    { _id: new ObjectId(booking._id) },
    { $set: booking }
  );

  return result.modifiedCount === 1 ? (booking as BookingModel) : null;
};

const _create = async (
  booking: BookingToSave
): Promise<BookingModel | null> => {
  const collection = await dbService.getCollection("bookings");
  const data = (await collection.insertOne(booking)) as unknown as BookingModel;
  if (!data) return null;
  return {
    _id: data._id!.toString(),
    stayId: data.stayId!.toString(),
    userId: data.userId!.toString(),
    hostId: data.hostId!.toString(),
    status: data.status as BookingStatus,
    price: data.price!,
    adults: data.adults,
    children: data.children,
    infants: data.infants,
    pets: data.pets,
    checkIn: data.checkIn!,
    checkOut: data.checkOut!,
    bookingTime: data.bookingTime!,
  };
};
