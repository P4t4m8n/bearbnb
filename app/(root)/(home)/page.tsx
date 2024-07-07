import StayFilter from "@/components/StayFilter/StayFilter";
import StayList from "@/components/StayList/StayList";
import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import { SearchParamsModel } from "@/model/filters.model";
import { Suspense } from "react";
interface Props {
  searchParams: SearchParamsModel;
}
export default async function Home({ searchParams }: Props) {
  return (
    <section>
      <Suspense fallback={<StayListSkeleton />}>
        <StayFilter />

        <StayList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
