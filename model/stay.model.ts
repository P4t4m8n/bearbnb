import { LikeModel } from "./Like.model";
import { AmenityTypes } from "./amenities.type";
import { AmenityModel } from "./amenity.model";
import { BedRoomModel } from "./bedroom.model";
import { BookingModel, BookingSmallModel } from "./booking.model";
import { HighlightModel } from "./highlight.model";
import { LabelsType } from "./labels.type";
import { LocationModel, LocationSmallModel } from "./location.model";
import { ReviewModel } from "./review.model";
import { UserModel, UserSmallModel } from "./user.model";

export interface StaySmallModel {
  _id?: string; 
  name: string;
  images: string[];
  price: number;
  location: LocationSmallModel;
  firstAvailableDate: Date[] | null;
  rating: number;
  type:string
}

export interface StayModel extends StaySmallModel {
  summary: string;
  description: string;
  entireHome: boolean;
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
}



