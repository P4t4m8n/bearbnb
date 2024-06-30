import { dbService } from "@/db/db.service";
import { ReviewModel, ReviewToSaveModel } from "@/model/review.model";
import { ObjectId } from "mongodb";

export const getReviewById = async (
  id: string
): Promise<ReviewModel | null> => {
  const collection = await dbService.getCollection("reviews");
  const data = await collection.findOne({ _id: new ObjectId(id) });

  if (!data) return null;

  return {
    _id: data._id!.toString(),
    stayId: data.stayId!.toString(),
    bookingId: data.bookingId!.toString(),
    userId: data.userId!.toString(),
    overallRating: data.overallRating,
    cleanliness: data.cleanliness,
    accuracy: data.accuracy,
    checkIn: data.checkIn,
    communication: data.communication,
    location: data.location,
    value: data.value,
    text: data.text,
    createdAt: data._id.getTimestamp(),
  };
};

export const saveReview = async (
  review: ReviewModel
): Promise<ReviewModel | null> => {
  if (review._id) {
    return await _update(review);
  } else return await _create(review);
};

const _update = async (review: ReviewModel): Promise<ReviewModel | null> => {
  const collection = await dbService.getCollection("reviews");
  const result = await collection.updateOne(
    { _id: new ObjectId(review._id) },
    { $set: review }
  );

  return result.modifiedCount === 1 ? review : null;
};

const _create = async (
  review: ReviewToSaveModel
): Promise<ReviewModel | null> => {
  const collection = await dbService.getCollection("reviews");
  const data = await collection.insertOne(review);
  if (!data) return null;
  const overallRating =
    (review.cleanliness +
      review.accuracy +
      review.checkIn +
      review.communication +
      review.location +
      review.value) /
    6;

  return {
    ...review,
    _id: data.insertedId.toString(),
    createdAt: data.insertedId.getTimestamp(),
    overallRating,
  };
};
