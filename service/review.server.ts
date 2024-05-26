"use server";

import { ReviewModel } from "@/model/review.model";
import { prisma } from "@/prisma/prisma";

// Define an interface for the review schema,
// representing the data structure in the database.
interface ReviewSchema {
  stay: {
    hostId: string;
  };
  id: string;
  stayId: string;
  text: string;
  overallRating: number;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  bookingId: string;
}
// Retrieve the review data from the database by ID, including the host ID.
export const getReviewById = async (id: string): Promise<ReviewModel> => {
  try {
    const reviewSchema: ReviewSchema = await prisma.review.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        stay: {
          select: {
            hostId: true,
          },
        },
      },
    });

    // Convert the database schema object to the ReviewModel format.
    const review = schemaToReviewModel(reviewSchema);
    return review;
  } catch (error) {
    throw error;
  }
};
// Save a review to the database, either by creating a new one or updating an existing one.
export const saveReview = async (review: ReviewModel): Promise<ReviewModel> => {
  if (review.id) {
    return await updateReview(review);
  } else {
    return await createReview(review);
  }
};
//**********private functions**********//
// Create a new review in the database.
const createReview = async (review: ReviewModel): Promise<ReviewModel> => {
  try {
    // Insert a new review record into the database.
    const newReviewSchema = await prisma.review.create({
      data: {
        stayId: review.stayId,
        text: review.text,
        overallRating: review.overallRating,
        cleanliness: review.cleanliness,
        accuracy: review.accuracy,
        checkIn: review.checkIn,
        communication: review.communication,
        location: review.location,
        value: review.value,
        userId: review.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookingId: review.bookingId,
      },
    });
    // Return the newly created review, including the host ID.
    return { ...newReviewSchema, hostId: review.hostId };
  } catch (error) {
    throw error;
  }
};
// Update an existing review in the database.
const updateReview = async (review: ReviewModel): Promise<ReviewModel> => {
  try {
    // Update the review record in the database.
    const updatedReviewSchema = await prisma.review.update({
      where: {
        id: review.id,
      },
      data: {
        text: review.text,
        overallRating: review.overallRating,
        cleanliness: review.cleanliness,
        accuracy: review.accuracy,
        checkIn: review.checkIn,
        communication: review.communication,
        location: review.location,
        value: review.value,
        updatedAt: new Date(),
      },
    });
    // Return the updated review, including the host ID.
    return { ...updatedReviewSchema, hostId: review.hostId };
  } catch (error) {
    throw error;
  }
};
// Helper function to convert a review schema object from the database to the ReviewModel format.
const schemaToReviewModel = (review: ReviewSchema): ReviewModel => {
  return {
    id: review.id,
    text: review.text,
    overallRating: review.overallRating,
    userId: review.userId,
    stayId: review.stayId,
    hostId: review.stay.hostId,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    cleanliness: review.cleanliness,
    accuracy: review.accuracy,
    checkIn: review.checkIn,
    communication: review.communication,
    location: review.location,
    value: review.value,
    bookingId: review.bookingId,
  };
};
