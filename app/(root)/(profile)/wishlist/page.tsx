import WishlistIndex from "@/components/Profile/Wishlist/WishlistIndex";
import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import { Suspense } from "react";

export default async function Wishlist({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  const { userId } = searchParams;

  return (
    <Suspense fallback={<StayListSkeleton />}>
      <WishlistIndex userId={userId} />
    </Suspense>
  );
}
