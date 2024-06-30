import { ReviewModel } from "@/model/review.model";

export const getEmptyReview = (
  stayId: string,
  bookingId: string,
  userId?: string
): ReviewModel => {
  return {
    overallRating: 0,
    text: "",
    stayId: stayId,
    userId: userId || "",
    createdAt: new Date(),
    updatedAt: new Date(),
    cleanliness: 0,
    accuracy: 0,
    checkIn: 0,
    communication: 0,
    location: 0,
    value: 0,
    bookingId,
  };
};
