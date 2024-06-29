import { LikeModel } from "./Like.model";
import { AmenitiesType } from "./amenities.type";
import { BedRoomModel } from "./bedroom.model";
import { HighlightModel } from "./highlight.model";
import { LabelsType } from "./labels.type";
import { LocationModel, LocationSmallModel } from "./location.model";
import { ReviewModel } from "./review.model";
import { UserModel } from "./user.model";

export interface StaySmallModel {
  _id?: string; // ObjectId as string
  name: string;
  images: string[];
  price: number;
  location: LocationSmallModel;
  firstAvailableDate: Date[] | null;
  rating: number;
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
  host: UserModel;
  amenities: AmenitiesType[];
  likes: LikeModel[];
  highlights: HighlightModel[];
  reviews: ReviewModel[];
  location:LocationModel
}
