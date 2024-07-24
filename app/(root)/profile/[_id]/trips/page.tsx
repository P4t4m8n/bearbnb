import { Suspense } from "react";
import TripList from "@/components/Profile/Trips/TripList/TripList";
import TripSkeleton from "@/components/skeletons/TripSkeleton/TripSkeleton";

export default async function Trips({ params }: { params: { _id: string } }) {
  const { _id } = params;
  return (
    <Suspense fallback={<TripSkeleton />}>
      <TripList userId={_id} />;
    </Suspense>
  );
}
