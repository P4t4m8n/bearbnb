export interface ReviewModel {
  id: string;
  text: string;
  overallRating: number;
  userId: string;
  stayId: string;
  hostId?: string;
  createdAt: Date;
  updatedAt: Date;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  bookingId: string;

}