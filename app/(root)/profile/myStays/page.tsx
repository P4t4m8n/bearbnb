
import MyStayList from "@/components/Profile/MyStays/MyStayList/MyStayList";
import MyStayListSkeleton from "@/components/skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { Suspense } from "react";

export default async function Stays({ searchParams }: { searchParams: any }) {
  const { userId } = searchParams;

  return (
    <Suspense fallback={<MyStayListSkeleton />}>
      <MyStayList userId={userId} />
    </Suspense>
  );
}
