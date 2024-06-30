import { Document, ObjectId } from "mongodb";

export interface BookingModel extends Document {
  _id?:string|ObjectId
  checkIn: Date;
  checkOut: Date;
  bookingTime: Date;
  price: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  stayId: string; // ObjectId as string
  userId: string; // ObjectId as string
  hostId: string; // ObjectId as string
  status: BookingStatus;
}

export interface BookingToSave  {
  checkIn: Date;
  checkOut: Date;
  bookingTime: Date;
  price: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  stayId: string; // ObjectId as string
  userId: string; // ObjectId as string
  hostId: string; // ObjectId as string
  status: BookingStatus;
}



export type BookingStatus = "pending" | "confirmed" | "canceled" | "completed";
