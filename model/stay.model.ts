import { Beds } from "@prisma/client";
import { BookingSmallModel } from "./booking.model";
import { SvgIconModel } from "./icons.model";
import { LikeModel } from "./like.model";
import { LocationAddressSmallModel, LocationModel } from "./location.model";
import { ReviewModel } from "./review.model";
import { UserSmallModel } from "./user.model";

export type BedsType = "single" | "double" | "crib";

export interface ImageModel {
  id?: string;
  url: string;
}
export interface AmenityModel {
  id: string;
  name: string;
}
export interface LabelModel {
  id: string;
  name: string;
}
export interface BedRoomModel {
  beds: BedsType[];
  images: string[];
}
export interface GuestsModel {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
export interface HighlightsModel {
  id: string;
  title: string;
  description: string;
  icon: SvgIconModel;
}
export interface MinimumStayModel {
  id: string;
  images: ImageModel[];
  name: string;
}
export interface StayLikeModel extends MinimumStayModel {
  type: string;
  bedrooms: Beds[];
  description: string;
  rating: number;
  location: LocationAddressSmallModel;
}
export interface StaySmallModel extends MinimumStayModel {
  type: string;
  price: number;
  location: LocationModel;
  rating: number;
  firstAvailableDate?: Date[];
}
export interface StayModel extends StaySmallModel {
  images: ImageModel[];
  summary: string;
  description?: string;
  capacity: number;
  amenities: string[];
  baths: number;
  uniqueRooms?: string[];
  labels: string[];
  host: UserSmallModel;
  reviews?: ReviewModel[];
  likes?: LikeModel[];
  bedrooms: BedRoomModel[];
  bookings: BookingSmallModel[];
  highlights: HighlightsModel[];
}
