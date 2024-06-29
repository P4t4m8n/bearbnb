import ReviewEdit from "@/components/ui/Review/ReviewEdit/ReviewEdit";
import { ReviewModel } from "@/model/review.model";
import { getReviewById, saveReview } from "@/service/review.server";
import { getEmptyReview } from "@/service/review.service";
import { getSmallStayById, getStayById } from "@/service/stay.server";

interface Props {
  searchParams: {
    stayId: string;
    bookingId: string;
    reviewId?: string;
    userId?: string;
    hostId?: string;
  };
}
export default async function AddReview({ searchParams }: Props) {
  const { stayId, reviewId, userId, hostId, bookingId } = searchParams;
  const stay = await getSmallStayById(stayId);
  let review: ReviewModel;
  if (reviewId) {
    review = await getReviewById(reviewId);
  } else {
    review = getEmptyReview(stay.id, bookingId, userId);
  }

  const onSaveReview = async (review: ReviewModel) => {
    "use server";
    const fixedReview = {
      ...review,
      overallRating: +review.overallRating,
      cleanliness: +review.cleanliness,
      accuracy: +review.accuracy,
      checkIn: +review.checkIn,
      communication: +review.communication,
      location: +review.location,
      value: +review.value,
    };

    return await saveReview(fixedReview);
  };

  return (
    <ReviewEdit
      onSaveReview={onSaveReview}
      review={review}
      stay={stay}
      userId={userId}
    />
  );
}
