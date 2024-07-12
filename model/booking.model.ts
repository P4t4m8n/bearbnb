import { Document, ObjectId } from "mongodb";
import { UserSmallModel } from "./user.model";
import { StaySmallModel } from "./stay.model";

export interface BookingSmallModel extends Document {
  _id?: string;
  checkIn: Date;
  checkOut: Date;
}
export interface BookingModel extends BookingSmallModel {
  bookingTime: Date;
  price: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  stay?: StaySmallModel;
  user?: UserSmallModel;
  host?: UserSmallModel;
  status: BookingStatus;
}
export interface BookingSchema {
  _id: ObjectId;
  checkIn: Date;
  checkOut: Date;
  price: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  stayId: ObjectId;
  userId: ObjectId;
  hostId: ObjectId;
  status: BookingStatus;
  bookingTime: Date;
}

export type BookingStatus = "pending" | "confirmed" | "canceled" | "completed";
