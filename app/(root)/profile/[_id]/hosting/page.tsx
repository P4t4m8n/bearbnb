import MyStayList from "@/components/Profile/MyStays/MyStayList/MyStayList";
import MyStayListSkeleton from "@/components/skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { Suspense } from "react";

export default async function Stays({
  params,
}: {
  params: { _id: string };
}) {
  const { _id } = params;

  return (
    <Suspense fallback={<MyStayListSkeleton />}>
      <MyStayList userId={_id} />
    </Suspense>
  );
}
