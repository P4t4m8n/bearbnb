import StayFilter from "@/components/StayFilter/StayFilter";
import StayList from "@/components/StayList/StayList";
import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section>
      <Suspense fallback={<StayListSkeleton />}>
        <StayFilter />

        <StayList />
      </Suspense>
    </section>
  );
}
