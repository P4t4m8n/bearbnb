import { Suspense } from "react";
import TripList from "@/components/ui/Profile/Trips/TripList/TripList";
import TripSkeleton from "@/components/ui/skeletons/TripSkeleton/TripSkeleton";

export default async function Trips({
  searchParams,
}: {
  searchParams: { userId: string };
}) {
  const { userId } = searchParams;
  return (
    <Suspense fallback={<TripSkeleton />}>
      <TripList userId={userId} />
    </Suspense>
  );
}
