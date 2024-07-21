import { BookingModel } from "@/model/booking.model";

export const getEmptyBooking = (
  checkIn?: Date,
  checkOut?: Date
): BookingModel => {
  return {
    checkIn: checkIn || new Date(),
    checkOut: checkOut || new Date(),
    price: 0,
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
    status: "pending",
    stay: {
      _id: "",
      name: "",
      image: "",
      price: 0,
      type: "",
    },
    user: {
      _id: "",
      firstName: "",
      imgUrl: "",
      lastName: "",
    },
    host: {
      _id: "",
      firstName: "",
      imgUrl: "",
      lastName: "",
    },
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
