import { BookingModel } from "@/model/stay.model";

export const getEmptyBooking = (): BookingModel => {
  return {
    stay: null,
    user: null,
    host: null,
    price: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    bookingTime: null,
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  };
};