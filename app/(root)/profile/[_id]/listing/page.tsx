import ListingIndex from "@/components/Profile/Listing/ListingIndex";
import MyStayListSkeleton from "@/components/skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { Suspense } from "react";

export default async function Listings({
  params,
}: {
  params: { _id: string };
}) {
  const { _id } = params;

  return (
    <Suspense fallback={<MyStayListSkeleton />}>
      <ListingIndex hostId={_id} />
    </Suspense>
  );
}
