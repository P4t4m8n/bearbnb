import { Beds } from "@prisma/client";
import { Status } from "./types.model";
export interface ImageModel {
  id: string;
  url: string;
}
export interface Amenity {
  id: string;
  name: string;
}
export interface Label {
  id: string;
  name: string;
}

export interface MinimumUser {
  id: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  authId?: string;
}
export interface UserSmall extends MinimumUser {
  email: string;
  isOwner: boolean;
  ownerSince?: Date;
  likes: Like[];
}
export interface User extends UserSmall {
  stays?: StaySmall[] | null;
  reviews?: Review[] | null;
  bookings?: BookingModel[] | null;
  hosting?: BookingModel[] | null;
}
export interface LocationSmall {
  lat: number;
  lng: number;
}
export interface Location extends LocationSmall {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  stay?: Stay;
}
export interface Review {
  id: string;
  text: string;
  rate: number;
  userId: string;
  user: User;
  stayId: string;
  stay: Stay;
}
export interface Like {
  id: string;
  userId: string;
  stayId: string;
}
export interface BedRoom {
  beds: Bed[];
  images: string[];
}
export interface Bed {
  type: Beds;
}

export interface MinimumStay {
  id: string;
  image: string;
  name: string;
}
export interface StaySmall extends MinimumStay {
  type: string;
  price: number;
  locationId: string;
  location: Location;
  rating: number;
  firstAvailableDate?: Date[] | null;
}
export interface Stay extends StaySmall {
  images: ImageModel[];
  summary: string;
  description?: string;
  capacity: number;
  amenities: { name: string }[];
  baths?: number;
  uniqueRooms?: string[];
  labels: string[];
  host: UserSmall;
  reviews?: Review[];
  likes?: Like[];
  bedrooms: BedRoom[];
  booking: BookingModalSmall[];
  highlights: HighLightsModel[];
}
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
  status: Status;
  bookingTime: Date | null;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
export interface BookingDTO {
  id?: string;
  stayId: string|null;
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
export interface GuestsModel {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
export interface SearchBY {
  dates?: { start: Date | null; end: Date | null };
  name?: string;
  location?: string;
  priceRange?: { start: number; end: number };
  host?: string;
}
export interface HighLightsModel {
  id: string;
  title: string;
  description: string;
  icon: SvgIconModel;
  stayId: string;
}
export interface SvgIconModel {
  path: string;
  viewBox: string;
}
