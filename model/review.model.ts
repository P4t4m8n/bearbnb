export interface ReviewModel {
  text: string;
  overallRating: number;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  stayId: string; // ObjectId as string
  bookingId: string; // ObjectId as string
  userId: string; // ObjectId as string
}