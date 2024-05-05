import { BookingModel, SearchBY, Stay } from "@/model/stay.model";

export const getEmptyFilter = (): SearchBY => {
  return {
    name: "",
    dates: { start: null, end: null },
    priceRange: { start: 1, end: 10000 },
    location: "",
  };
};

export const getDefaultDates = (
  stay: Stay,
  booking: BookingModel
): {
  formatCheckIn: { day: string; month: string; year: number };
  formatCheckOut: { day: string; month: string; year: number };
} => {
  const formatCheckIn = {
    day: booking.checkIn
      ? booking.checkIn.getDate().toString().padStart(2, "0")
      : stay.firstAvailableDate![0].getDate().toString().padStart(2, "0"),
    month: booking.checkIn
      ? (booking.checkIn?.getMonth() + 1).toString().padStart(2, "0")
      : (stay.firstAvailableDate![0].getMonth() + 1)
          .toString()
          .padStart(2, "0"),
    year: booking.checkIn
      ? booking.checkIn.getFullYear()
      : stay.firstAvailableDate![0].getFullYear(),
  };
  const formatCheckOut = {
    day: booking.checkOut
      ? booking.checkOut.getDate().toString().padStart(2, "0")
      : stay.firstAvailableDate![2].getDate().toString().padStart(2, "0"),
    month: booking.checkOut
      ? (booking.checkOut?.getMonth() + 1).toString().padStart(2, "0")
      : (stay.firstAvailableDate![2].getMonth() + 1)
          .toString()
          .padStart(2, "0"),
    year: booking.checkOut
      ? booking.checkOut.getFullYear()
      : stay.firstAvailableDate![2].getFullYear(),
  };

  return { formatCheckIn, formatCheckOut };
};
