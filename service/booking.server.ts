"use server";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { BookingDTO, BookingModel, TripModel } from "@/model/booking.model";
import { getRating } from "./stay.service";
// import { getCache, setCache } from "./cache";

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

// Save the booking to the database. If the booking already has an ID, update the existing booking;
export const saveBooking = async (
  booking: BookingModel
): Promise<BookingModel> => {
  let updatedBooking: BookingModel;
  try {
    // Validate the booking input and convert it to a BookingDTO object.
    const parsedBooking = validateBookingDTO(booking);
    // If the booking has an ID, update the existing booking; otherwise, create a new booking.
    if (booking.id) updatedBooking = await updateBooking(parsedBooking);
    else updatedBooking = await createBooking(parsedBooking);
    // If no ID in the updated/created booking, throw an error indicating failure.
    if (!updatedBooking?.id) throw new Error("Booking not created");
    return updatedBooking;
  } catch (error) {
    throw new Error(`Failed to save booking: ${error}`);
  }
};
// Retrieve the booking data from the database, including related stay, user, and host details.
// If the booking data is not found, return null.
export const getBookingById = async (
  bookingId: string
): Promise<BookingModel | Error> => {
  try {
    const data = await prisma.booking.findUniqueOrThrow({
      where: { id: bookingId },
      include: {
        stay: {
          select: {
            id: true,
            name: true,
            images: true,
            location: true,
            type: true,
            price: true,
            reviews: true,
          },
        },
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            isOwner: true,
            imgUrl: true,
          },
        },
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            isOwner: true,
            imgUrl: true,
          },
        },
      },
    });

    // If no stay associated with the booking is found, throw an error.
    if (!data.stay) throw new Error("Booking Stay not found");
    // Calculate the rating from stay reviews.
    const rating = getRating(data.stay.reviews);
    // Prepare the stay object with combined information and calculated rating.
    const stay = {
      id: data.stay.id,
      images: data.stay.images,
      name: data.stay.name,
      type: data.stay.type,
      price: data.stay.price,
      location: data.stay.location,
      rating,
    };
    // Deconstruct and reassemble the booking object with detailed structured information.
    const {
      id,
      status,
      price,
      adults,
      children,
      infants,
      pets,
      checkIn,
      checkOut,
      bookingTime,
    } = data;
    const booking = {
      stay,
      user: data.user,
      host: data.host,
      id,
      status,
      price,
      adults,
      children,
      infants,
      pets,
      checkIn,
      checkOut,
      bookingTime,
    };
    return booking;
  } catch (error) {
    throw new Error(`Failed to get booking: ${error}`);
  }
};
// Fetch user-specific bookings with selected details for trip summaries.
export const getUserTrips = async (userId: string): Promise<TripModel[]> => {
  try {
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
    // Map booking data to a more concise format for trip display.
    const trips = bookings.map((booking) => {
      return {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        image: booking.stay.images[0].url,
        city: booking.stay.location.city,
        hostName: booking.host.firstName,
        id: booking.id,
      };
    });

    return trips;
  } catch (error) {
    throw new Error(`Failed to get user trips: ${error}`);
  }
};

//Fetch host-specific orders for his stays.
export const getHostListing = async (
  hostId: string
): Promise<BookingModel[]> => {
  let listings = [];
  try {
    listings = await prisma.booking.findMany({
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
            images: true,
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
        host: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
            imgUrl: true,
          },
        },
      },
    });

    return listings;
  } catch (error) {
    throw new Error(`Failed to get host listing: ${error}`);
  }
};

//*******Private functions*********//

// Update the existing booking data in the database with the provided booking details.
const updateBooking = async (booking: BookingDTO): Promise<BookingModel> => {
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
    include: {
      stay: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      user: {
        select: { id: true, firstName: true, lastName: true, imgUrl: true },
      },
      host: {
        select: { id: true, firstName: true, lastName: true, imgUrl: true },
      },
    },
  });
  // After updating, create an entry in the audit log to record this action.
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
// Create a new booking in the database with the provided booking details.
const createBooking = async (
  parsedBooking: BookingDTO
): Promise<BookingModel> => {
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
    include: {
      stay: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      user: {
        select: { id: true, firstName: true, lastName: true, imgUrl: true },
      },
      host: {
        select: { id: true, firstName: true, lastName: true, imgUrl: true },
      },
    },
  });
  return newBooking;
};
// Validate the provided BookingModel object and convert it to a BookingDTO object.
const validateBookingDTO = (booking: BookingModel): BookingDTO => {
  // Construct a DTO from the provided BookingModel.
  const bookingDTO: BookingDTO = {
    id: booking?.id,
    stayId: booking.stay?.id,
    userId: booking.user?.id,
    hostId: booking.host?.id,
    status: booking.status,
    price: booking.price,
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    bookingTime: new Date(),
  };
  // Validate the constructed DTO against a schema to ensure it meets all requirements
  // and return the validated DTO.
  return bookingSchema.parse(bookingDTO);
};
