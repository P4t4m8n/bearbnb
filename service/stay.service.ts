import { SearchByModel } from "@/model/filters.model";
import { ReviewModel } from "@/model/review.model";
import { ImageModel, StayModel, StaySmallModel } from "@/model/stay.model";

// Returns a default SearchByModel object with predefined empty or initial values.
export const getEmptyFilter = (): SearchByModel => {
  return {
    name: "",
    dates: {},
    priceRange: { start: 1, end: 10000 },
    location: "",
  };
};
// Generates formatted check-in and check-out dates based on provided booking
// data or fallbacks to the stay's available dates.
export const getDefaultDates = (
  stay: StayModel | null,
  booking: { checkIn: Date; checkOut: Date }
): {
  formatCheckIn: { day: string; month: string; year: number };
  formatCheckOut: { day: string; month: string; year: number };
} => {
  // Format check-in and check-out dates
  const formatCheckIn = {
    day: booking.checkIn
      ? booking.checkIn.getDate().toString().padStart(2, "0")
      : stay!.firstAvailableDate![0].getDate().toString().padStart(2, "0"),
    month: booking.checkIn
      ? (booking.checkIn?.getMonth() + 1).toString().padStart(2, "0")
      : (stay!.firstAvailableDate![0].getMonth() + 1)
          .toString()
          .padStart(2, "0"),
    year: booking.checkIn
      ? booking.checkIn.getFullYear()
      : stay!.firstAvailableDate![0].getFullYear(),
  };
  const formatCheckOut = {
    day: booking.checkOut
      ? booking.checkOut.getDate().toString().padStart(2, "0")
      : stay!.firstAvailableDate![2].getDate().toString().padStart(2, "0"),
    month: booking.checkOut
      ? (booking.checkOut?.getMonth() + 1).toString().padStart(2, "0")
      : (stay!.firstAvailableDate![2].getMonth() + 1)
          .toString()
          .padStart(2, "0"),
    year: booking.checkOut
      ? booking.checkOut.getFullYear()
      : stay!.firstAvailableDate![2].getFullYear(),
  };

  return { formatCheckIn, formatCheckOut };
};
// Converts an array of Date objects into a human-readable date range string.
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
  return `${month} ${startDay}-${endDay}`;
};
// Transforms bedroom data to include counts of each bed type and list of image URLs.
export const transformBedrooms = (
  bedrooms: { beds: any[]; images?: ImageModel[] }[]
): {
  bedCounts: number;
  beds: string[] | null;
  images: ImageModel[] | null;
}[] => {
  return bedrooms.map((bedroom) => {
    // Count the number of each type of bed
    const bedCounts = bedroom.beds.reduce((acc, bed) => {
      acc[bed] = (acc[bed] || 0) + 1;
      return acc;
    }, {});

    // Format the bed description based on the counts
    const formattedBeds = Object.keys(bedCounts).map((bedType) => {
      return `${bedCounts[bedType]} ${bedType} bed${
        bedCounts[bedType] > 1 ? "s" : ""
      }`;
    });

    // Return the transformed bedroom object
    return {
      bedCounts,
      beds: formattedBeds,
      images: bedroom.images || null,
    };
  });
};
// Returns a default StayModel object with all fields set to their initial empty or default values.
export const getEmptyStay = (): StayModel => {
  return {
    id: "",
    name: "",
    type: "",
    summary: "",
    price: 0,
    description: "",
    capacity: 0,
    baths: 0,
    amenities: [],
    images: [],
    labels: [],
    uniqueRooms: [],
    host: {
      email: "",
      isOwner: false,
      likes: [],
      id: "",
      firstName: "",
      lastName: "",
    },
    reviews: [],
    likes: [],
    bedrooms: [],
    bookings: [],
    highlights: [],
    location: {
      id: "",
      country: "",
      countryCode: "",
      city: "",
      address: "",
      lat: 0,
      lng: 0,
    },
    rating: 0,
    firstAvailableDate: [],
  };
};
// Calculate and return the average rating if reviews exist and are non-empty,
// otherwise return 0.
export const getRating = (
  reviews: ReviewModel[] | null | undefined
): number => {
  return reviews?.length
    ? reviews.reduce((acc, curr) => acc + curr.rate, 0) / reviews.length
    : 0;
};

export const stayToSmallStay = (stay: StayModel): StaySmallModel => {
  return {
    id: stay.id,
    type: stay.type,
    name: stay.name,
    images: stay.images,
    price: stay.price,
    location: stay.location,
    rating: getRating(stay.reviews),
  };
};

export const findFirstConsecutiveDaysAfterDate = (
  targetDate: Date,
  bookings: { checkIn: Date; checkOut: Date }[],
  numberOfDays: number // This parameter specifies the number of consecutive days needed
): Date[] => {
  // Helper to add days to a date
  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Helper to check if a date is within any booking intervals
  function isDateAvailable(
    date: Date,
    bookings: { checkIn: Date; checkOut: Date }[]
  ): boolean {
    return !bookings.some(
      (booking) => date >= booking.checkIn && date <= booking.checkOut
    );
  }

  // Start searching from the day after the target date
  let currentDate = addDays(targetDate, 1);

  // Loop until we find the required number of consecutive available days
  while (true) {
    let allDaysAvailable = true;
    let dates = [];

    for (let i = 0; i < numberOfDays; i++) {
      const nextDay = addDays(currentDate, i);
      if (!isDateAvailable(nextDay, bookings)) {
        allDaysAvailable = false;
        break;
      }
      dates.push(nextDay);
    }

    if (allDaysAvailable) {
      return dates;
    }

    // Move to the next day and repeat the check
    currentDate = addDays(currentDate, 1);
  }
};
