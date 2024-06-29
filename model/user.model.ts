import { Document } from "mongodb";
import { LikeModel } from "./Like.model";

export interface UserModel extends Document {
  isOwner: boolean;
  ownerSince?: Date;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  dob: Date;
  password?: string;
  email: string;
  likes?: LikeModel[];
}
