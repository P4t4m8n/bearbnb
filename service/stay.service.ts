import {
  BookingModel,
  LocationSmall,
  SearchBY,
  Stay,
} from "@/model/stay.model";

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

export const formatDatesToRange = (
  dates: Date[] | null | undefined
): string => {
  if (!dates) return "";

  // Sort dates just in case they are not in order
  dates.sort((a, b) => a.getTime() - b.getTime());

  // Extract the year, month, and day from the first date
  const firstDate = dates[0];
  const endDate = dates[dates.length - 1];

  // Format month and day
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const locale = "en-US"; //  locale format

  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(
    firstDate
  );
  const startDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
    firstDate
  );
  const endDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
    endDate
  );

  // Build the final string
  return `${month} ${startDay} - ${endDay}`;
};
