import WishlistIndex from "@/components/Profile/Wishlist/WishlistIndex";
import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import { Suspense } from "react";

export default async function Wishlist({
  params,
}: {
  params: { _id: string };
}) {
  const { _id } = params;

  return (
    <Suspense fallback={<StayListSkeleton />}>
      <WishlistIndex userId={_id} />
    </Suspense>
  );
}
