import { Status } from "./status.type";
import { MinimumStayModel, StaySmallModel } from "./stay.model";
import { MinimumUserModel, UserSmallModel } from "./user.model";

export interface BookingSmallModel {
  checkIn: Date;
  checkOut: Date;
  id?: string;
}
export interface TripModel extends BookingSmallModel {
  image: string;
  city: string;
  hostName: string;
}
export interface BookingModel extends BookingSmallModel {
  stay: MinimumStayModel;
  user: MinimumUserModel;
  host: MinimumUserModel;
  price: number;
  bookingTime: Date;
  adults: number;
  status: Status;
  children: number;
  infants: number;
  pets: number;
}
export interface BookingDTO {
  id?: string;
  stayId: string;
  userId: string;
  hostId: string;
  price: number;
  adults: number;
  status: Status;
  children: number;
  infants: number;
  pets: number;
  checkIn: Date;
  checkOut: Date;
  bookingTime: Date;
}

export interface ListingSmallModel extends BookingSmallModel {
  user: MinimumUserModel;
  stay: MinimumStayModel;
  host?: MinimumUserModel;
  price: number;
  bookingTime: Date;
  adults: number;
  status: Status;
  children: number;
  infants: number;
  pets: number;
}
