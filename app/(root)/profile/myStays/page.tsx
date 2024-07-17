import MyStayList from "@/components/Profile/MyStays/MyStayList/MyStayList";
import MyStayListSkeleton from "@/components/skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { Suspense } from "react";

export default async function Stays({
  searchParams,
}: {
  searchParams: { _id: string };
}) {
  const { _id } = searchParams;

  return (
    <Suspense fallback={<MyStayListSkeleton />}>
      <MyStayList userId={_id} />
    </Suspense>
  );
}
