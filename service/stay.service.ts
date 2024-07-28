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
    name: "My shity home",
    type: "House",
    price: 100,
    isPublished: false,
    description:
      "Your family will be close to everything when you stay at this centrally-located place",
    capacity: 1,
    baths: 0,
    guestStay: "Entire place",
    host: {
      _id: "",
      firstName: "",
      lastName: "",
      imgUrl: "",
    },
    amenities: [
      {
        _id: "668d0734aa1ef32693fca8f2",

        name: "Luggage Dropoff Allowed",
        path: "M30 29v2H2v-2zM20 1a2 2 0 0 1 2 1.85V5h3a5 5 0 0 1 5 4.78V22a5 5 0 0 1-4.78 5H7a5 5 0 0 1-5-4.78V10a5 5 0 0 1 4.78-5H10V3a2 2 0 0 1 1.85-2H12zm5 6H7a3 3 0 0 0-3 2.82V22a3 3 0 0 0 2.82 3H25a3 3 0 0 0 3-2.82V10a3 3 0 0 0-3-3zm-8 2v9.5l3.3-3.3 1.4 1.42-4.64 4.65-.11.1a1.5 1.5 0 0 1-1.9 0l-.11-.1-4.65-4.65 1.42-1.41L15 18.5V9zm3-6h-8v2h8z",
        viewBox: "0 0 32 32",
        category: "Miscellaneous",
      },
      {
        _id: "668d0734aa1ef32693fca8f3",

        name: "Patio Or Balcony",
        path: "M23 1a2 2 0 0 1 2 1.85V19h4v2h-2v8h2v2H3v-2h2v-8H3v-2h4V3a2 2 0 0 1 1.85-2H9zM9 21H7v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm-10-8H9v6h6zm8 0h-6v6h6zM15 3H9v8h6zm8 0h-6v8h6z",
        viewBox: "0 0 32 32",
        category: "Outdoor",
      },
      {
        _id: "668d0734aa1ef32693fca8f4",

        name: "Elevator",
        path: "M30 1a1 1 0 0 1 1 .88V30a1 1 0 0 1-.88 1H2a1 1 0 0 1-1-.88V2a1 1 0 0 1 .88-1H2zM3 3v26h12V3zm7 9v6.58l1.8-1.79 1.4 1.42-3.5 3.5a1 1 0 0 1-1.31.08l-.1-.08-3.5-3.5 1.42-1.42L8 18.6V12zm12.39-1.5a1 1 0 0 1 1.22 0l.1.09 3.5 3.5-1.42 1.41L24 13.7V20h-2v-6.3l-1.8 1.8-1.4-1.41 3.5-3.5zM17 29h12V3H17z",
        viewBox: "0 0 32 32",
        category: "Miscellaneous",
      },
      {
        _id: "668d0734aa1ef32693fca8f5",

        name: "High Chair",
        path: "M16 1a7 7 0 0 1 7 6.76V15a2 2 0 0 1-1.5 1.94L23.85 31h-2.03l-2.33-14H12.5l-2.33 14H8.15l2.35-14.06A2 2 0 0 1 9 15.16V8a7 7 0 0 1 7-7zm0 2a5 5 0 0 0-5 4.78V15h10V8a5 5 0 0 0-5-5zm9 6v2h-8v5h-2v-5H7V9z",
        viewBox: "0 0 32 32",
        category: "Miscellaneous",
      },
      {
        _id: "668d0734aa1ef32693fca8f6",

        name: "Carbon Monoxide Alarm",
        path: "M25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-4.78 5H7a5 5 0 0 1-5-4.78V7a5 5 0 0 1 4.78-5H7zm0 2H7a3 3 0 0 0-3 2.82V25a3 3 0 0 0 2.82 3H25a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17zm9.8 0h2.03A7 7 0 0 1 17 22.93V20.9a5 5 0 0 0 3.9-3.9zM16 13a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm1-5.93A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9zm-2 0v2.03a5 5 0 0 0-3.9 3.9H9.07A7 7 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
        viewBox: "0 0 32 32",
        category: "Safety",
      },
      {
        _id: "668d0734aa1ef32693fca8f7",

        name: "Oven",
        path: "M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zm0 10H4v16h24zm-2 2v12H6V14zm-2 2H8v8h16zm4-12H4v6h24zm-3 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
        viewBox: "0 0 32 32",
        category: "Kitchen",
      },
      {
        _id: "668d0734aa1ef32693fca8f8",

        name: "Coffee Maker",
        path: "M25 2a1 1 0 0 1 .94.65l.03.1 1 4A1 1 0 0 1 26.11 8L26 8h-9v2h-2V8H5v20h3a5 5 0 0 1-.72-4.66l.1-.26 2.52-6.04-1.8-3.6a1 1 0 0 1 .78-1.43L9 12h14a1 1 0 0 1 .94 1.34l-.05.1L22.62 16H24a5 5 0 0 1 5 4.78V25h-2v-4a3 3 0 0 0-2.82-3H22.5l2.12 5.08A5 5 0 0 1 24 28h3v2H4a1 1 0 0 1-1-.88V3a1 1 0 0 1 .88-1H4zM12.65 22a6.64 6.64 0 0 0-2.91.63l-.5 1.22a3 3 0 0 0-.2.68l-.03.23L9 25a3 3 0 0 0 2.82 3h8.19l.23-.01a3 3 0 0 0 2.6-2.02c-1.7-.12-2.93-.67-4.84-1.9l-.37-.23c-2.14-1.4-3.18-1.84-4.98-1.84zm7.68-4h-8.66l-.92 2.19a9.06 9.06 0 0 1 1.9-.19c2.19 0 3.51.52 5.75 1.95l.38.25c1.74 1.13 2.74 1.62 4.03 1.76l-.04-.11zm1.05-4H10.62l1 2h8.76zm2.84-10H5v2h19.72z",
        viewBox: "0 0 32 32",
        category: "Kitchen",
      },
      {
        _id: "668d0734aa1ef32693fca8f9",

        name: "TV",
        path: "M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z",
        viewBox: "0 0 32 32",
        category: "Entertainment",
      },
      {
        _id: "668d0734aa1ef32693fca8fa",

        name: "Smart TV",
        path: "M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z",
        viewBox: "0 0 32 32",
        category: "Entertainment",
      },
      {
        _id: "668d0734aa1ef32693fca8fb",

        name: "Iron",
        path: "M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z",
        viewBox: "0 0 32 32",
        category: "Bedroom And Laundry",
      },
      {
        _id: "668d0734aa1ef32693fca8fc",

        name: "Hot Water",
        path: "m4 2v2h2l.001 2h-1.001c-1.1045695 0-2 .8954305-2 2v16.3846154c0 3.0720253 2.20424471 5.6153846 5 5.6153846h16c2.7957553 0 5-2.5433593 5-5.6153846v-9.3846154h-2l.0006267 2.2441864c-.2957862.1662973-.6415947.2556548-1.0003023.2558136-.3770726-.0001668-.7397707-.0987428-1.0448826-.2813581l-.147435-.0980881-.0698054-.0542225-.0669618-.0575717c-.1674894-.1516722-.3473184-.2870627-.5370123-.4056091-.1267551-.0791722-.2576057-.1507019-.3921007-.2145789l-.2041007-.0899647c-.4828805-.1966888-1.005996-.2986069-1.537908-.2986069-.1521835 0-.3034078.0083174-.453179.0247859l-.2234033.0307902c-.658505.1092272-1.2810008.3778141-1.8035225.7911936l-.1911344.1617761c-.3493432.3161496-.8261929.4912319-1.3293208.4914542-.5021258-.0002223-.9789755-.1753046-1.3283187-.4914542-.7261733-.6571745-1.6832835-1.0085458-2.6712392-1.0085458-.9878365 0-1.9453342.3515135-2.6706493 1.008332-.3497754.3163381-.8267557.4914457-1.3290263.491668-.502832-.0002223-.97980321-.1753492-1.32908476-.4912404-.72578749-.6572461-1.68328523-1.0087596-2.67112174-1.0087596-.34005846 0-.67646247.0416292-1.00105227.1230294l.00093437-8.1230294h4v2h2v-2c0-1.1045695-.8954305-2-2-2h-.999l-.001-2.001 2 .001v-2zm22.0003242 17.4999999c.3396204-.0001501.6755904-.0417799.9997827-.1230407v5.0076562c0 2.0259877-1.3775842 3.6153845-3.0001069 3.6153845h-16c-1.62252271 0-3-1.5893968-3-3.6153845l-.00148637-6.1285018c.29592169-.1666518.64208407-.2561137 1.00160427-.2561137.5026133 0 .97950576.1750753 1.32911493.4916681.72598912.6565871 1.68280283 1.0078952 2.67109137 1.0083319.9877-.0004367 1.9445263-.3517037 2.6710333-1.0087595.3491367-.3161652.8260292-.4912405 1.3286425-.4912405.5028479 0 .9795643.1750107 1.3292324.4914543.725724.6567679 1.6826278 1.008109 2.6713278 1.0085457.987581-.0004368 1.9447946-.351846 2.6704432-1.0085457.3496467-.3164242.826354-.4914543 1.3288787-.4914543.5028479 0 .9795643.1750107 1.3292324.4914543.6698295.6061843 1.5369688.9522395 2.4431705 1.0022354zm-8.0059505-15.50004556-1.999421.00109132c.0017379 1.66765868-.3914074 2.67484348-1.6096005 4.57626989l-.4357339.67326735c-1.1985316 1.8730246-1.7578573 3.1084741-1.9072678 4.7489216l2.013841.0007885c.1565646-1.2622433.6616712-2.2705308 1.7787146-3.9820993l.243287-.37580218c1.405662-2.19695557 1.9189882-3.50550246 1.9161806-5.64243718zm3.0005862.00002214c-.0019426 1.6881104-.3993036 2.69826243-1.6537336 4.66840333l-.3870791.60284703c-1.2033592 1.89238746-1.7606515 3.11545826-1.9109072 4.72843796h2.0148819c.1395749-1.0872185.5479182-1.9947141 1.4095297-3.3786139l.7616667-1.19781229c1.2938583-2.07979737 1.7634695-3.36210955 1.7656416-5.42219097zm5 0c-.0019426 1.6881104-.3993036 2.69826243-1.6537336 4.66840333l-.3870791.60284703c-1.2033592 1.89238746-1.7606515 3.11545826-1.9109072 4.72843796h2.0148819c.1395749-1.0872185.5479182-1.9947141 1.4095297-3.3786139l.7616667-1.19781229c1.2938583-2.07979737 1.7634695-3.36210955 1.7656416-5.42219097z",
        viewBox: "0 0 32 32",
        category: "Bathroom",
      },
      {
        _id: "668d0734aa1ef32693fca8fd",

        name: "HotTub",
        path: "M9.5 2a4.5 4.5 0 0 1 3.53 7.3c.6.21 1.17.54 1.66.98l.19.19L17.4 13H31v2h-2v14a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15H1v-2h2.1a5 5 0 0 1 2.96-3.6A4.5 4.5 0 0 1 9.5 2zm7.08 13H5v14h22V15h-7.59l3.3 3.3-1.42 1.4zM9.5 4a2.5 2.5 0 0 0-1 4.8V11H8a3 3 0 0 0-2.83 2h9.41l-1.12-1.12a3 3 0 0 0-1.92-.87l-.2-.01h-.84V8.8a2.5 2.5 0 0 0-1-4.8zm15.49-3a6.96 6.96 0 0 1-1.8 4.07l-.45.46A8.97 8.97 0 0 0 20.35 11h-2a10.97 10.97 0 0 1 3.2-7.12A4.96 4.96 0 0 0 22.97 1zm2 0h2a10.96 10.96 0 0 1-3.2 7.12A4.97 4.97 0 0 0 24.38 11h-2a6.97 6.97 0 0 1 1.8-4.06l.44-.47A8.96 8.96 0 0 0 26.99 1z",
        viewBox: "0 0 32 32",
        category: "Bathroom",
      },
      {
        _id: "668d0734aa1ef32693fca8fe",

        name: "Garden Or Backyard",
        path: "M5 17a1 1 0 0 1-.93-1.36 13.28 13.28 0 0 1 15.3-8.33 4 4 0 1 1 7.03 3.8l-.13.2.21.24a13.81 13.81 0 0 1 2.45 4.09 1 1 0 0 1-.82 1.35L28 17H17v9h13v2h-4v3h-2v-3H9v3H7v-3H2v-2h3.59l-4.3-4.3 1.42-1.4L8.4 26H15v-9zm11.5-8a11.2 11.2 0 0 0-9.77 5.69l-.17.31h19.88l-.17-.32a11.2 11.2 0 0 0-9.12-5.66L16.81 9zM31 8v2h-3V8zm-8-1a2 2 0 0 0-1.67.9 13.1 13.1 0 0 1 3.45 2.01A2 2 0 0 0 23 7zm4.95-4.36 1.41 1.41-2.12 2.12-1.41-1.41zm-9.9 0 2.12 2.12-1.41 1.41-2.12-2.12zM24 1v3h-2V1z",
        viewBox: "0 0 32 32",
        category: "Outdoor",
      },
      {
        _id: "668d0734aa1ef32693fca8ff",

        name: "Sun Lounge",
        path: "M5 17a1 1 0 0 1-.93-1.36 13.28 13.28 0 0 1 15.3-8.33 4 4 0 1 1 7.03 3.8l-.13.2.21.24a13.81 13.81 0 0 1 2.45 4.09 1 1 0 0 1-.82 1.35L28 17H17v9h13v2h-4v3h-2v-3H9v3H7v-3H2v-2h3.59l-4.3-4.3 1.42-1.4L8.4 26H15v-9zm11.5-8a11.2 11.2 0 0 0-9.77 5.69l-.17.31h19.88l-.17-.32a11.2 11.2 0 0 0-9.12-5.66L16.81 9zM31 8v2h-3V8zm-8-1a2 2 0 0 0-1.67.9 13.1 13.1 0 0 1 3.45 2.01A2 2 0 0 0 23 7zm4.95-4.36 1.41 1.41-2.12 2.12-1.41-1.41zm-9.9 0 2.12 2.12-1.41 1.41-2.12-2.12zM24 1v3h-2V1z",
        viewBox: "0 0 32 32",
        category: "Miscellaneous",
      },
      {
        _id: "668d0734aa1ef32693fca900",

        name: "BBQ",
        path: "M13 2h2c0 2.06-.48 3.34-1.77 5.42l-.75 1.19C11.6 10 11.2 10.9 11.06 12H9.04c.1-1.07.38-1.97.9-3H6a10 10 0 0 0 20 .28V9h-3.77a7.44 7.44 0 0 0-1.17 3h-2.02c.15-1.61.71-2.84 1.91-4.73l.57-.88c1.11-1.79 1.47-2.78 1.47-4.4h2c0 1.93-.4 3.17-1.5 5L28 7v2c0 .68-.06 1.35-.17 2H30v2h-2.68a12.04 12.04 0 0 1-5.9 6.7l4.5 9.89-1.83.82-2-4.41H17v4h-2v-4H9.92L7.9 30.41l-1.82-.82 4.49-9.88A12.04 12.04 0 0 1 4.68 13H2v-2h2.17A12.06 12.06 0 0 1 4 9.3V7h7.13l.39-.6c1.11-1.8 1.47-2.8 1.47-4.4zm-.57 18.46L10.83 24H15v-3.04a11.95 11.95 0 0 1-2.57-.5zm4.57.5V24h4.17l-1.6-3.54c-.69.21-1.4.37-2.13.45zM18 2h2c0 2.06-.48 3.35-1.77 5.42l-.75 1.19C16.6 10 16.2 10.9 16.06 12h-2.02c.15-1.62.71-2.84 1.91-4.74l.57-.88C17.63 4.6 17.99 3.61 17.99 2z",
        viewBox: "0 0 32 32",
        category: "Outdoor",
      },
      {
        _id: "668d0734aa1ef32693fca901",

        name: "Out door Dining Area",
        path: "M29 15v16h-2v-6h-6v6h-2v-6.15a2 2 0 0 1 1.84-1.84L21 23h6v-8zM5 15v8h6a2 2 0 0 1 2 1.85V31h-2v-6H5v6H3V15zM16 1a15 15 0 0 1 13.56 8.57 1 1 0 0 1-.8 1.42l-.1.01H17v8h8v2h-8v10h-2V21H7v-2h8v-8H3.35a1 1 0 0 1-.95-1.32l.04-.1A15 15 0 0 1 16 1zm0 2A13 13 0 0 0 5.4 8.47l-.2.28-.16.25h21.92l-.17-.25a13 13 0 0 0-10.1-5.73L16.34 3z",
        viewBox: "0 0 32 32",
        category: "Outdoor",
      },
      {
        _id: "668d0734aa1ef32693fca902",

        name: "Air Conditioning",
        path: "M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z",
        viewBox: "0 0 32 32",
        category: "Essentials",
      },
      {
        _id: "668d0734aa1ef32693fca903",

        name: "Heating",
        path: "M16 0a5 5 0 0 1 5 4.78v12.98l.26.21a7.98 7.98 0 0 1 2.72 5.43l.02.3v.3a8 8 0 1 1-13.25-6.04l.25-.2V5A5 5 0 0 1 15.56.02l.22-.01zm0 2a3 3 0 0 0-3 2.82V18.78l-.43.3a6 6 0 1 0 7.06.15l-.2-.16-.43-.3V11h-4V9h4V7h-4V5h4a3 3 0 0 0-3-3zm1 11v7.13A4 4 0 0 1 16 28a4 4 0 0 1-1-7.87V13zm-1 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
        viewBox: "0 0 32 32",
        category: "Essentials",
      },
      {
        _id: "668d0734aa1ef32693fca904",

        name: "Sea Views",
        path: "M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v15.5h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 18c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1v3h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 23c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1V28h24zm-6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
        viewBox: "0 0 32 32",
        category: "Scenic Views",
      },
      {
        _id: "668d0734aa1ef32693fca905",

        name: "Mountain Views",
        path: "M28 2a2 2 0 0 1 2 1.85V28a2 2 0 0 1-1.85 2H4a2 2 0 0 1-2-1.85V4a2 2 0 0 1 1.85-2H4zm-5.92 20H9.92L4 27.91V28h24v-.09zM28 4H4v21.08l12-12 12 12zM16 15.91 11.91 20h8.17zM22 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
        viewBox: "0 0 32 32",
        category: "Scenic Views",
      },
    ],
    images: [
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/aaron-huber-G7sE2S4Lab4-unsplash_qmi18k.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540628/samples/bearbnb/alan-alves-yZDC3jE6TP8-unsplash_ad9t89.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/alexandra-gorn-W5dsm9n6e3g-unsplash_1_cvjszl.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/avery-klein-JaXs8Tk5Iww-unsplash_tjmrcl.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/bailey-anselme-Bkp3gLygyeA-unsplash_qvvtmh.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/beazy-60SnthS09Ao-unsplash_hfrvht.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540629/samples/bearbnb/beazy-aX1TTOuq83M-unsplash_n4xjvs.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/bench-accounting-nvzvOPQW0gc-unsplash_bkmisp.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/brian-babb-XbwHrt87mQ0-unsplash_uhqpqt.jpg",
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540630/samples/bearbnb/brina-blum-nWX4pKwzLoE-unsplash_aqqnh3.jpg",
    ],
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
    // location: {
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
