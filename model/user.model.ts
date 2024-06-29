import { Document, ObjectId } from "mongodb";
import { LikeModel } from "./Like.model";

export interface UserModel extends Document {
  _id: string | ObjectId;
  dob: Date;
  email: string;
  firstName: string;
  lastName: string;
  isOwner: boolean;
  ownerSince?: Date;
  imgUrl?: string;
  password?: string;
  likes?: LikeModel[];
}

export interface UserCreateModel {
  dob: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
