import { ObjectId } from "mongodb";
import { LikeModel } from "./Like.model";
import { User } from "next-auth";
import { ReviewModel } from "./review.model";

export interface UserSmallModel {
  _id: string;
  isOwner?: boolean;
  ownerSince?: Date;
  firstName: string;
  lastName: string;
  imgUrl: string;
}
export interface UserModel extends UserSmallModel {
  dob: Date;
  email: string;
  likes?: LikeModel[];
  reviews?: ReviewModel[];
  password?: string;
}
export interface userSchema {
  _id?: ObjectId;
  isOwner: boolean;
  OwnerSince?: Date;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  dob: Date;
  email: string;
  password: string;
}

export interface UserFilterModel {
  email?: string;
  _id?: ObjectId;
}
