import { LikeModel } from "./Like.model";
import { BookingSmallModel } from "./booking.model";
import { SvgIconModel } from "./icons.model";
import { LocationAddressSmallModel } from "./location.model";
import { ReviewModel } from "./review.model";
import { UserSmallModel } from "./user.model";

type BedsType = "single" | "double" | "crib";

export interface ImageModel {
  id: string;
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
  stayId: string;
}
export interface MinimumStayModel {
  id: string;
  image: string;
  name: string;
}
export interface StayLikeModel extends MinimumStayModel {
  type: string;
  bedrooms: BedsType;
  description: string;
  rating: number;
  location: LocationAddressSmallModel;
}
export interface StaySmallModel extends MinimumStayModel {
  type: string;
  price: number;
  location: Location;
  rating: number;
  firstAvailableDate?: Date[];
}
export interface Stay extends StaySmallModel {
  images: ImageModel[];
  summary: string;
  description?: string;
  capacity: number;
  amenities: string[];
  baths?: number;
  uniqueRooms?: string[];
  labels: string[];
  host: UserSmallModel;
  reviews?: ReviewModel[];
  likes?: LikeModel[];
  bedrooms: BedRoomModel[];
  booking: BookingSmallModel[];
  highlights: HighlightsModel[];
}
