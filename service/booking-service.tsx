import { BookingModel } from "@/model/stay.model";

export const getEmptyBooking = (): BookingModel => {
  return {
    stay: null,
    user: null,
    host: null,
    price: 0,
    status: "pending",
    checkIn: null,
    checkOut: null,
    bookingTime: null,
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  };
};

export const daysBetweenDates = (date1: Date, date2: Date) => {
  if (!date1 || !date2) return 0;
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.ceil(diffInTime / oneDay);

  return diffInDays;
};
