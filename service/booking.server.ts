"use server";

import { BookingDTO, BookingModel, TripModel } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { getCache, setCache } from "./cache";

export const saveBooking = async (booking: BookingModel) => {
  const bookingSchema = z
    .object({
      stayId: z.string(),
      userId: z.string(),
      hostId: z.string(),
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

  const bookingDTO: BookingDTO = {
    stayId: booking.stay?.id!,
    userId: booking.user?.id!,
    hostId: booking.host?.id!,
    price: booking.price,
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
    checkIn: booking.checkIn!,
    checkOut: booking.checkOut!,
    bookingTime: new Date(),
  };
  const parsedBooking = bookingSchema.parse(bookingDTO);

  try {
    const newBooking = await prisma.booking.create({
      data: {
        stayId: parsedBooking.stayId,
        userId: parsedBooking.userId,
        hostId: parsedBooking.hostId,
        price: parsedBooking.price,
        adults: parsedBooking.adults,
        children: parsedBooking.children,
        infants: parsedBooking.infants,
        pets: parsedBooking.pets,
        checkIn: parsedBooking.checkIn,
        checkOut: parsedBooking.checkOut,
        bookingTime: new Date(),
      },
    });
    return newBooking;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingById = async (bookingId: string): Promise<any> => {
  try {
    const booking = await prisma.booking.findUniqueOrThrow({
      where: { id: bookingId },
      include: {
        stay: true,
        user: true,
        host: true,
      },
    });
    return booking;
  } catch (error) {
    console.error(error);
  }
};

export const getUserTrips = async (
  userId: string
): Promise<TripModel[] | undefined> => {
  try {
    const cachedTrips = await getCache(userId);
    if(cachedTrips) return cachedTrips
    const bookings = await prisma.booking.findMany({
      where: { userId: userId },
      select: {
        checkIn: true,
        checkOut: true,
        id: true,
        stay: {
          select: {
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
            location: { select: { city: true } },
          },
        },
        host: { select: { firstName: true } },
      },
    });
    const trips = bookings.map((booking) => {
      return {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        image: booking.stay!.images[0].url,
        city: booking.stay!.location.city,
        hostName: booking.host.firstName,
        id: booking.id,
      };
    });
    setCache(userId, trips);

    return trips;
  } catch (error) {
    console.error(error);
  }
};
