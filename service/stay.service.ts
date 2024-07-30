import { BedroomMap, BedRoomModel } from "@/model/bedroom.model";
import { FilterByModel } from "@/model/filters.model";
import { SvgsNameTypes } from "@/model/icons.model";
import { ReviewModel } from "@/model/review.model";
import { GuestStayType, StayModel, StaySmallModel } from "@/model/stay.model";

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
  firstAvailableDate: Date[] | null | undefined,
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

export function getBedroomMap(bedroom: BedRoomModel): BedroomMap {
  const bedroomMap: BedroomMap = {};

  bedroom.beds.forEach((bed) => {
    if (bedroomMap[bed]) {
      bedroomMap[bed]++;
    } else {
      bedroomMap[bed] = 1;
    }
  });

  return bedroomMap;
}
export function getBedroomsMap(bedrooms: BedRoomModel[]): BedroomMap {
  const bedroomMap: BedroomMap = {};

  bedrooms.forEach((bedroom) => {
    bedroom.beds.forEach((bed) => {
      if (bedroomMap[bed]) {
        bedroomMap[bed]++;
      } else {
        bedroomMap[bed] = 1;
      }
    });
  });

  return bedroomMap;
}
// Returns a default StayModel object with all fields set to their initial empty or default values.
export const getEmptyStay = (): StayModel => {
  return {
    name: "",
    type: "House",
    price: 100,
    isPublished: false,
    description: "",
    capacity: 1,
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
      country: "",
      countryCode: "",
      city: "",
      streetAddress: "",
      lat: 0,
      lng: 0,
    },
    //   country: "Japan",
    //   countryCode: "JP",
    //   city: "Tokyo",
    //   streetAddress: "Tokyo Midtown 9-7-1 Akasaka",
    //   lat: 35.6654,
    //   lng: 139.7297,
    // },
    rating: 0,
    firstAvailableDate: [],
    currency: "₪",
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

  const {
    _id,
    type,
    name,
    images,
    price,
    rating,
    firstAvailableDate,
    currency,
  } = stay;

  return {
    _id,
    type,
    name,
    images,
    price,
    location,
    rating,
    firstAvailableDate,
    currency,
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

export const calculateDaysBetweenDates = (
  checkIn: string | undefined | null,
  checkOut: string | undefined | null
): number => {
  const DEFAULT_DAYS = 3;
  const MILLISECONDS_IN_A_DAY = 1000 * 3600 * 24;

  if (!checkIn || !checkOut) {
    return DEFAULT_DAYS;
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return DEFAULT_DAYS;
  }

  const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  return Math.ceil(timeDiff / MILLISECONDS_IN_A_DAY);
};

// Constants
export const sharedOptions: {
  option: GuestStayType;
  svg: SvgsNameTypes;
  paragraph: string;
}[] = [
  {
    option: "Entire place",
    svg: "house",
    paragraph: "Guests have the whole place to themselves",
  },
  {
    option: "Private room",
    svg: "door",
    paragraph:
      "Guests have their own room in a home, plus access to shared spaces",
  },
  {
    option: "Shared room",
    svg: "sharedHouse",
    paragraph:
      "Guests sleep in a room or common area that may be shared with you or others",
  },
];

//Check and Tested
export const calculateYearsSinceOwnership = (
  ownerSince: Date | null | undefined
): number => {
  if (!ownerSince || isNaN(ownerSince.getTime())) {
    return 0;
  }

  const currentDate = new Date();
  const ownerYear = ownerSince.getFullYear();
  const currentYear = currentDate.getFullYear();

  // Check if the owner anniversary this year has been reached
  const hasAnniversaryPassedThisYear =
    currentDate.getMonth() > ownerSince.getMonth() ||
    (currentDate.getMonth() === ownerSince.getMonth() &&
      currentDate.getDate() >= ownerSince.getDate());

  return hasAnniversaryPassedThisYear
    ? currentYear - ownerYear
    : currentYear - ownerYear - 1;
};

export const calculateTotalBeds = (bedrooms: BedRoomModel[] = []): number => {
  return bedrooms.reduce(
    (total, bedroom) =>
      total + (Array.isArray(bedroom.beds) ? bedroom.beds.length : 0),
    0
  );
};
