import { Amenity } from "@/model/amenities.type";
import { FilterByModel, SearchParamsModel } from "@/model/filters.model";
import { ReviewModel } from "@/model/review.model";
import {
  BedRoomModel,
  LabelModel,
  StayModel,
  StaySmallModel,
} from "@/model/stay.model";
import { fi } from "@faker-js/faker";

// Returns a default SearchByModel object with predefined empty or initial values.
export const getEmptyFilter = (): FilterByModel => {
  return {
    name: "",
    dates: { start: null, end: null },
    priceRange: { start: 1, end: 10000 },
    host: "",
    type: "AnyType",
    totalBeds: 0,
    bedroomsAmount: 0,
    baths: 0,
    label: "",
    amenities: [],
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
    ? reviews.reduce((acc, curr) => acc + curr.overallRating, 0) /
        reviews.length
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

export const searchParamsToFilter = (
  searchParams: SearchParamsModel
): FilterByModel => {
  console.log("searchParams:", searchParams);
  const { startDate, endDate } = searchParams;
  const location = searchParams.location
    ? searchParams.location.split(",")
    : [];
  console.log("location:", location);
  const filter: FilterByModel = {};
  if (searchParams.startDate)
    filter.dates = { start: new Date(startDate), end: null };
  if (searchParams.endDate)
    filter.dates = {
      start: startDate ? new Date(startDate) : new Date(),
      end: new Date(endDate),
    };
  if (searchParams.location)
    filter.location = {
      coords: {
        lat: +location[0],
        lng: +location[1],
      },
      radius: 100,
    };
  filter.priceRange = {
    start: +searchParams.priceRange || 1,
    end: 999999999999,
  };
  if (searchParams.name) filter.name = searchParams.name;
  if (searchParams.label) filter.label = searchParams.label;
  if (searchParams.type) filter.type = searchParams.type;
  filter.bedroomsAmount = searchParams.bedroomsAmount
    ? searchParams.bedroomsAmount
    : 99;
  filter.totalBeds = searchParams.totalBeds ? searchParams.totalBeds : 99;
  filter.baths = searchParams.baths ? searchParams.baths : 99;
  if (searchParams.amenities)
    filter.amenities = searchParams.amenities.split(",") as Amenity[];

  return filter;
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
        filterByObject.amenities = value.split(",") as Amenity[];
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
