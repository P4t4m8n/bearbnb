import StayFilter from "@/components/ui/StayFilter/StayFilter";
import StayList from "@/components/ui/StayList/StayList";
import LoginPage from "./login/page";
import { Suspense } from "react";
import StayListSkeleton from "@/components/ui/skeletons/StayListSkeleton/StayListSkeleton";

export default async function Home({ searchParams }: { searchParams: any }) {
  return (
    <>
      <StayFilter />
      <Suspense fallback={<StayListSkeleton />}>
        <StayList searchParams={searchParams} />
      </Suspense>
      <LoginPage />
    </>
  );
}
