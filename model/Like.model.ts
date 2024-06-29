import { Document } from "mongoose";

export interface LikeModel  {
  _id: string;
  userId: string; // ObjectId as string
  stayId: string; // ObjectId as string
}
