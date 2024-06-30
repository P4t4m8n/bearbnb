export interface ReviewModel extends ReviewToSaveModel {
  _id?: string; // ObjectId as string
  createdAt: Date;
  updatedAt?: Date;
  overallRating: number;

}
export interface ReviewToSaveModel {
  text: string;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  stayId: string; // ObjectId as string
  bookingId: string; // ObjectId as string
  userId: string; // ObjectId as string
}
