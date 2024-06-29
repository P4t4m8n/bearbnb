import ListingIndex from "@/components/ui/Profile/Listing/ListingIndex";
import MyStayListSkeleton from "@/components/ui/skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { Suspense } from "react";

export default async function Listings({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  const { userId } = searchParams;

  return (
    <Suspense fallback={<MyStayListSkeleton/>}>
      <ListingIndex userId={userId} />
    </Suspense>
  );
}
