import { BookingModel } from "./booking.model";
import { LikeModel } from "./like.model";
import { ReviewModel } from "./review.model";
import { StaySmallModel } from "./stay.model";

export interface MinimumUserModel {
  id: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  authId?: string;
}
export interface UserSmallModel extends MinimumUserModel {
  email?: string;
  isOwner: boolean;
  ownerSince?: Date;
  likes?: LikeModel[];
}
export interface UserModel extends UserSmallModel {
  stays?: StaySmallModel[];
  reviews?: ReviewModel[];
  bookings?: BookingModel[];
  hosting?: BookingModel[];
}
