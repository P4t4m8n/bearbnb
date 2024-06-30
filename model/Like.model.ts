import { ObjectId } from "mongodb";
import { BedRoomModel } from "./bedroom.model";

export interface LikeModel {
  _id: string; // ObjectId as string
  stayId?: string; // ObjectId as string
  userId?: string; // ObjectId as string
  note: string;
}

export interface LikeDTO {
  _id?: ObjectId; // ObjectId as string
  stayId?: ObjectId; // ObjectId as string
  userId?: ObjectId; // ObjectId as string
  note?: string;
}

export interface LikeExtendedModel extends LikeModel {
  stayName: string;
  images: string[];
  type: string;
  city: string;
  country: string;
  rating: number;
  description: string;
  bedrooms: BedRoomModel[];
}
