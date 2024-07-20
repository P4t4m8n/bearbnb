import { LikeModel } from "./Like.model";
import { AmenityModel } from "./amenity.model";
import { BedRoomModel } from "./bedroom.model";
import { BookingSmallModel } from "./booking.model";
import { CurrencyType } from "./currency.type";
import { HighlightModel } from "./highlight.model";
import { LabelsType } from "./labels.type";
import { LocationModel, LocationSmallModel } from "./location.model";
import { ReviewModel } from "./review.model";
import { UserSmallModel } from "./user.model";

export interface StaySmallModel {
  _id?: string;
  name: string;
  images: string[];
  price: number;
  location: LocationSmallModel;
  firstAvailableDate: Date[] | null;
  rating: number;
  type: StayType;
}

export interface StayModel extends StaySmallModel {
  summary: string;
  guestStay?: GuestStayType;
  description: string;
  capacity: number;
  price: number;
  baths: number;
  labels: LabelsType[];
  bedRooms: BedRoomModel[];
  host: UserSmallModel;
  amenities: AmenityModel[];
  likes: LikeModel[];
  highlights: HighlightModel[];
  reviews: ReviewModel[];
  location: LocationModel;
  bookings: BookingSmallModel[];
  currency: CurrencyType;
}

export type GuestStayType =
  | "Entire place"
  | "Shared place"
  | "Private room"
  | "Shared room";

export type StayType =
  | "House"
  | "Apartment"
  | "Bed & breakfast"
  | "Cabin"
  | "Houseboat"
  | "Tiny home"
  | "Hotel"
  | "Farm"
  | "Castle"
  | "Mobile home"
  | "Barn";
