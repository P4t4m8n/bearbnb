import { Suspense } from "react";
import TripList from "@/components/Profile/Trips/TripList/TripList";
import TripSkeleton from "@/components/skeletons/TripSkeleton/TripSkeleton";

export default async function Trips({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  return (
    <Suspense fallback={<TripSkeleton />}>
      <TripList userId={userId} />;
    </Suspense>
  );
}
