import { BookingModel } from "@/model/booking.model";
import { getEmptyStay } from "./stay.service";
import { getEmptySmallUser } from "./user.service";

// Create an empty booking object with default values.
export const getEmptyBooking = (
  checkIn?: Date,
  checkOut?: Date
): BookingModel => {
  return {
    stay: getEmptyStay(),
    user: getEmptySmallUser(),
    host: getEmptySmallUser(),
    price: 0,
    status: "pending",
    checkIn: checkIn || new Date(),
    checkOut: checkOut || new Date(),
    bookingTime: new Date(),
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  };
};

// Calculate the number of days between two dates.
export const daysBetweenDates = (date1: Date, date2: Date) => {
  if (!date1 || !date2) return 0;
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInTime / oneDay);

  return diffInDays;
};
