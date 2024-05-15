import { Stay, StaySmallModel } from "@/model/stay.model";

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number = 2000
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<F>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function make_id(length = 5): string {
  let txt = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

export function makeLorem(size = 100): string {
  const words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    ".",
    "All",
    "this happened",
    "more or less",
    ".",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    ".",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  let txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

export const stayToSmallStay = (stay: Stay): StaySmallModel => {
  return {
    id: stay.id,
    type: stay.type,
    name: stay.name,
    image: stay.images[0]?.url || "",
    price: stay.price,
    locationId: stay.locationId,
    location: stay.location,
    rating:
      stay.reviews && stay.reviews.length > 0
        ? stay.reviews.reduce((acc, curr) => acc + curr.rate, 0) /
          stay.reviews.length
        : 0,
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
