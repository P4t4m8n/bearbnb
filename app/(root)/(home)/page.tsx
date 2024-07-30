import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import StayList from "@/components/StayList/StayList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section>
      <Suspense fallback={<StayListSkeleton />}>
        <StayList />
      </Suspense>
    </section>
  );
}
