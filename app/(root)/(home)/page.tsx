import { getSmallAmenities } from "@/actions/amenities.action";
import StayFilter from "@/components/StayFilter/StayFilter";
import StayList from "@/components/StayList/StayList";
import StayListSkeleton from "@/components/skeletons/StayListSkeleton/StayListSkeleton";
import { SearchParamsModel } from "@/model/filters.model";
import { Suspense } from "react";
interface Props {
  searchParams: SearchParamsModel;
}

export default async function Home({ searchParams }: Props) {
  console.log("searchParams:", searchParams)
  console.log("searchParams:", searchParams.location)
  const amenities = await getSmallAmenities();
  return (
    <section >
      <Suspense fallback={<StayListSkeleton />}>
        <StayFilter amenities={amenities} />
        <StayList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
