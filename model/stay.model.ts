import {  LocationSmallModel } from "./location.model";

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
  labels: string[];
  BedRooms: string[]; // Array of ObjectId as string
  hostId: string; // ObjectId as string
  amenities: string[]; // Array of ObjectId as string
  likes: string[]; // Array of ObjectId as string
}
