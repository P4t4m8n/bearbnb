import { BookingDTO, BookingModel } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";

export const saveBooking = async (booking: BookingModel) => {
  "use server";
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
  "use server";
  try {
    const booking = await prisma.booking.findUniqueOrThrow({
      where: { id: bookingId },
      include: {
        stay: true,
        user: true,
        host: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
