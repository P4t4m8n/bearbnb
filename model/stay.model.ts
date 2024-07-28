import { ObjectId } from "mongodb";
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
  type: StayType; //
  firstAvailableDate?: Date[] | null;
  rating: number;
  currency: CurrencyType;
}

export interface StayModel extends StaySmallModel {
  guestStay?: GuestStayType;//
  description: string;
  capacity: number;//
  price: number;
  baths: number;//
  labels: LabelsType[];
  bedRooms: BedRoomModel[];//
  host: UserSmallModel;
  amenities: AmenityModel[];
  likes: LikeModel[];
  highlights: HighlightModel[];
  reviews: ReviewModel[];
  location: LocationModel;//
  bookings: BookingSmallModel[];
  isPublished: boolean;
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

export interface StaySchema {
  _id?: ObjectId;
  name: string;
  type: StayType;
  guestStay: GuestStayType;
  capacity: number;
  images: string[];
  price: number;
  bedRooms: BedRoomModel[];
  description: string;
  baths: number;
  highlights: ObjectId[];
  hostId: ObjectId;
  locationId: ObjectId;
  amenities: ObjectId[];
  labels: LabelsType[];
  currency: CurrencyType;
  isPublished: boolean;
}
