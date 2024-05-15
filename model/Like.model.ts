import { StayLikeModel } from "./stay.model";

export interface WishListModel {
  id: string;
  notes: string;
  stay: StayLikeModel;
}

export interface LikeModel {
  id: string;
  userId: string;
  stayId: string;
}
