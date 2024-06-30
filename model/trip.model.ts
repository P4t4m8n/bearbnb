export interface TripModel {
  userId?: string;
  bookingId: string;
  image: string;
  city: string;
  hostName: string;
  stayId: string;
  reviewId?: string;
  checkIn: Date;
  checkOut: Date;
}
