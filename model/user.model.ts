import { Document, ObjectId } from "mongodb";
import { LikeModel } from "./Like.model";

export interface UserSmallModel {
  _id?: string;
  firstName: string;
  lastName: string;
  imgUrl?: string;
  ownerSince?: Date;

}
export interface UserModel extends Document {
  _id: string | ObjectId;
  dob: Date;
  email: string;
  firstName: string;
  lastName: string;
  isOwner: boolean;
  password?: string;
  ownerSince?: Date;
  imgUrl?: string;
  likes?: LikeModel[];
}

export interface UserCreateModel {
  dob: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
