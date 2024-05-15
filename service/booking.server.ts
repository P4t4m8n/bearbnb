"use server";

import { BookingDTO, BookingModel, TripModel } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";
// import { getCache, setCache } from "./cache";
import { ListingModelSmall } from "@/model/booking.model";
import { Status } from "@/model/types.model";

type BookingData = {
  id: string;
  status: Status;
  price: number;
  adults: number;
  children: number | null;
  infants: number | null;
  pets: number | null;
  checkIn: Date;
  checkOut: Date;
  stay: {
    id: string;
    name: string;
    images: { url: string }[];
  } | null;
  user: {
    firstName: string;
    lastName: string;
    id: string;
    imgUrl: string;
  };
};

export const saveBooking = async (
  booking: BookingModel
): Promise<BookingDTO | undefined> => {
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

  const bookingDTO: BookingDTO = {
    id: booking?.id,
    stayId: booking.stay?.id!,
    userId: booking.user?.id!,
    hostId: booking.host?.id!,
    status: booking.status,
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
  let updatedBooking: BookingDTO | undefined;
  try {
    if (booking.id) updatedBooking = await updateBooking(parsedBooking);
    else updatedBooking = await createBooking(parsedBooking);
    if (!updatedBooking?.id) throw new Error("Booking not created");
    return updatedBooking;
  } catch (error) {
    console.error("error:", error);
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
    // const cachedTrips = await getCache(userId);
    // if (cachedTrips) return cachedTrips;
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
    // setCache(userId, trips);

    return trips;
  } catch (error) {
    console.error(error);
  }
};

export const getHostListing = async (
  hostId: string
): Promise<ListingModelSmall[] | undefined> => {
  // let listings = await getCache(`listings${hostId}`);
  // if (listings) return listings;
  let listings = [];
  try {
    const data = await prisma.booking.findMany({
      where: {
        hostId: hostId,
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        price: true,
        adults: true,
        children: true,
        infants: true,
        bookingTime: true,
        pets: true,
        status: true,
        stay: {
          select: {
            id: true,
            name: true,
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            imgUrl: true,
          },
        },
      },
    });

    listings = data.map((booking: BookingData) => {
      return {
        ...booking,
        user: {
          id: booking.user.id,
          firstName: booking.user.firstName,
          lastName: booking.user.lastName,
          imgUrl: booking.user.imgUrl,
        },
        stay: {
          id: booking.stay?.id,
          name: booking.stay?.name,
          image: booking.stay?.images[0].url,
        },
      };
    });

    // await setCache(`listings${hostId}`, listings);
    return listings as ListingModelSmall[];
  } catch (error) {
    console.error("error:", error);
  }
};

const updateBooking = async (booking: BookingDTO): Promise<BookingDTO> => {
  const updatedBooking = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      price: booking.price,
      status: booking.status,
      adults: booking.adults,
      children: booking.children,
      infants: booking.infants,
      pets: booking.pets,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: updatedBooking.userId,
      bookingId: updatedBooking.id,
      action: "update",
      createdAt: new Date(),
    },
  });

  return updatedBooking;
};

const createBooking = async (
  parsedBooking: BookingDTO
): Promise<BookingDTO> => {
  const newBooking = await prisma.booking.create({
    data: {
      stayId: parsedBooking.stayId,
      userId: parsedBooking.userId,
      hostId: parsedBooking.hostId,
      price: parsedBooking.price,
      status: parsedBooking.status,
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
};
