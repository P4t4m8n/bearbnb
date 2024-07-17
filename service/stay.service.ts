import { BedRoomModel } from "@/model/bedroom.model";
import { FilterByModel } from "@/model/filters.model";
import { ReviewModel } from "@/model/review.model";
import { StayModel, StaySmallModel } from "@/model/stay.model";

export const getEmptyFilter = (isDates: boolean = true): FilterByModel => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 7);
  const dates = isDates
    ? { start: today, end: endDate }
    : { start: null, end: null };

  return {
    distance: 2000,
    dates,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    priceRange: { start: 0, end: 50000 },
    amenities: [],
    bedroomsAmount: 0,
    totalBeds: 0,
    baths: 0,
    type: "AnyType",
    labels: [],
  };
};

// Generates formatted check-in and check-out dates based on provided booking
// data or fallbacks to the stay's available dates.
export const getDefaultDates = (
  firstAvailableDate: Date[] | null,
  booking: { checkIn: Date; checkOut: Date }
): {
  formatCheckIn: { day: string; month: string; year: number };
  formatCheckOut: { day: string; month: string; year: number };
} => {
  // Format check-in and check-out dates
  const formatCheckIn = {
    day: booking.checkIn
      ? booking.checkIn.getDate().toString().padStart(2, "0")
      : firstAvailableDate![0].getDate().toString().padStart(2, "0"),
    month: booking.checkIn
      ? (booking.checkIn?.getMonth() + 1).toString().padStart(2, "0")
      : (firstAvailableDate![0].getMonth() + 1).toString().padStart(2, "0"),
    year: booking.checkIn
      ? booking.checkIn.getFullYear()
      : firstAvailableDate![0].getFullYear(),
  };
  const formatCheckOut = {
    day: booking.checkOut
      ? booking.checkOut.getDate().toString().padStart(2, "0")
      : firstAvailableDate![2].getDate().toString().padStart(2, "0"),
    month: booking.checkOut
      ? (booking.checkOut?.getMonth() + 1).toString().padStart(2, "0")
      : (firstAvailableDate![2].getMonth() + 1).toString().padStart(2, "0"),
    year: booking.checkOut
      ? booking.checkOut.getFullYear()
      : firstAvailableDate![2].getFullYear(),
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
  bedrooms: BedRoomModel[]
): {
  double: { count: number };
  single: { count: number };
  crib: { count: number };
  description: string;
}[] => {
  return bedrooms.map((room) => {
    // Initialize an object to store the counts  for each bed type
    const bedCounts: {
      double: { count: number };
      single: { count: number };
      crib: { count: number };
      description: string;
    } = {
      double: { count: 0 },
      single: { count: 0 },
      crib: { count: 0 },
      description: "",
    };

    // Loop through the beds in the current room
    for (const bed of room.beds) {
      // Update the counts based on the bed type
      switch (bed) {
        case "double":
          bedCounts.double.count++; // Increment the count of double beds
          break;
        case "single":
          bedCounts.single.count++; // Increment the count of single beds
          break;
        case "crib":
          bedCounts.crib.count++; // Increment the count of cribs
          break;
        default:
          // Handle unknown bed types if needed
          break;
      }
    }

    // Construct the description based on the counts and plural information
    const descriptions = [];
    if (bedCounts.double.count > 0) {
      descriptions.push(
        `${bedCounts.double.count} double bed${
          bedCounts.double.count > 1 ? "s" : ""
        }`
      );
    }
    if (bedCounts.single.count > 0) {
      descriptions.push(
        `${bedCounts.single.count} single bed${
          bedCounts.single.count > 1 ? "s" : ""
        }`
      );
    }
    if (bedCounts.crib.count > 0) {
      descriptions.push(
        `${bedCounts.crib.count} crib${bedCounts.crib.count > 1 ? "s" : ""}`
      );
    }
    // Combine descriptions into a single string
    bedCounts.description = descriptions.join(", ");

    return bedCounts;
  });
};
// Returns a default StayModel object with all fields set to their initial empty or default values.
export const getEmptyStay = (): StayModel => {
  return {
    name: "",
    type: "House",
    summary: "",
    price: 0,
    description: "",
    capacity: 0,
    baths: 0,
    guestStay: "Entire place",
    host: {
      _id: "",
      firstName: "",
      lastName: "",
      imgUrl: "",
    },
    amenities: [],
    images: [],
    labels: [],
    reviews: [],
    likes: [],
    bedRooms: [],
    bookings: [],
    highlights: [],
    location: {
      _id: "",
      country: "",
      countryCode: "",
      city: "",
      streetAddress: "",
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
    ? reviews.reduce((acc, curr) => acc + curr.overallRating, 0) /
        reviews.length
    : 0;
};

export const stayToSmallStay = (stay: StayModel): StaySmallModel => {
  const location = {
    lat: stay.location.lat,
    lng: stay.location.lng,
    country: stay.location.country,
    city: stay.location.city,
  };

  const { _id, type, name, images, price, rating, firstAvailableDate } = stay;

  return {
    _id,
    type,
    name,
    images,
    price,
    location,
    rating,
    firstAvailableDate,
  };
};

export const queryIteratorParamToFilter = (
  query: IterableIterator<[string, string]>
): FilterByModel => {
  const paramsArray: { key: string; value: string }[] = [];
  for (const [key, val] of query) {
    paramsArray.push({ key, value: val });
  }

  const filterByObject: FilterByModel = {};

  paramsArray.forEach(({ key, value }) => {
    switch (key) {
      case "dates":
        const [start, end] = value.split(",");
        filterByObject.dates = { start: new Date(start), end: new Date(end) };
        break;
      case "priceRange":
        const [startPrice, endPrice] = value.split(",").map(Number);
        filterByObject.priceRange = { start: startPrice, end: endPrice };
        break;
      case "bedroomsAmount":
      case "totalBeds":
      case "baths":
        filterByObject[key] = Number(value);
        break;
      case "amenities":
        filterByObject.amenities = value.split(",") as string[];
        break;
      default:
        filterByObject[key as keyof FilterByModel] = value as any;
        break;
    }
  });
  return filterByObject;
};

export const findFirstConsecutiveDaysAfterDate = (
  targetDate: Date,
  bookings: { checkIn: Date; checkOut: Date }[] = [],
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

export const fixedDatesForMobile = (
  dates?: {
    start: Date | null;
    end: Date | null;
  } | null
): string | null => {
  if (!dates || !dates.start || !dates.end) return null;
  const monthNameStart =
    dates?.start!.toLocaleString("default", { month: "long" }) || "";
  const monthNameEnd =
    dates?.end!.toLocaleString("default", { month: "long" }) || "";

  const fixedDates =
    monthNameStart === monthNameEnd
      ? `${monthNameStart} ${dates?.start?.getDate()} - ${dates?.end?.getDate()}`
      : `${monthNameStart} ${dates?.start?.getDate()} - ${monthNameEnd} ${dates?.end?.getDate()}`;

  return fixedDates;
};
