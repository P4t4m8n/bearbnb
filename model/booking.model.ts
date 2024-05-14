import { MinimumStay, MinimumUser, StaySmall, UserSmall } from "./stay.model";
import { Status } from "./types.model";

export interface BookingModalSmall {
  checkIn: Date | null;
  checkOut: Date | null;
  id?: string;
}
export interface TripModel extends BookingModalSmall {
  image: string;
  city: string;
  hostName: string;
}
export interface BookingModel extends BookingModalSmall {
  stay: StaySmall | null;
  user: UserSmall | null;
  host: UserSmall | null;
  price: number;
  bookingTime: Date | null;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
export interface BookingDTO {
  stayId: string;
  userId: string;
  hostId: string;
  price: number;
  adults: number;
  status: Status;
  children: number;
  infants: number;
  pets: number;
  checkIn: Date;
  checkOut: Date;
  bookingTime: Date;
}

export interface ListingModelSmall extends BookingModalSmall {
  user: MinimumUser;
  stay: MinimumStay;
  host?: MinimumUser;
  price: number;
  bookingTime: Date;
  adults: number;
  status: Status;
  children: number;
  infants: number;
  pets: number;
}
