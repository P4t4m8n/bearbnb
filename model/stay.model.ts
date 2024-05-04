import { Beds } from "@prisma/client";

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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imgUrl: string;
  isOwner: boolean;
  ownerSince?: Date;
  stays: Stay[];
  reviews: Review[];
  likes: Like[];
}

export interface UserSmall {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imgUrl?: string;
  isOwner: boolean;
  ownerSince?: Date;
  likes: Like[];
}

export interface Location {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
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
  user: User;
  stayId: string;
  stay: Stay;
}

export interface BedRoom {
  beds: Bed[];
  images: string[];
}

export interface Bed {
  type: Beds;
}

export interface Stay {
  id: string;
  name: string;
  type: string;
  images: ImageModel[];
  price: number;
  summary: string;
  description?: string;
  capacity: number;
  amenities: { name: string }[];
  baths?: number;
  uniqueRooms?: string[];
  labels: string[];
  host: UserSmall;
  locationId: string;
  location: Location;
  reviews?: Review[];
  likes?: Like[];
  rating: number;
  bedrooms: BedRoom[];
}

export interface StaySmall {
  id: string;
  type: string;
  image: string;
  price: number;
  locationId: string;
  location: Location;
  rating: number;
}

export interface BookingModel {
  id?: string;
  stay: StaySmall | null;
  user: UserSmall | null;
  host: UserSmall | null;
  price: number;
  checkIn: Date | null;
  checkOut: Date | null;
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
