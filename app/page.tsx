import StayFilter from "@/components/ui/StayFilter/StayFilter";
import StayList from "@/components/ui/StayList/StayList";
import { SearchBY, StaySmall } from "@/model/stay.model";
import LoginPage from "./login/page";
import { getSmallStays } from "@/service/stay.server";

export default async function Home({ searchParams }: { searchParams: any }) {
  console.log("searchParams:", searchParams);
  let stays: StaySmall[] | undefined = [];
  const searchObj: SearchBY = {
    dates: {
      start: searchParams.startDate ? new Date(searchParams.startDate) : null,
      end: searchParams.endDate ? new Date(searchParams.endDate) : null,
    },
    priceRange: { start: 1, end: 999999999999 },
    location: "",
    name: searchParams.name||'',
  };
  try {
    stays = await getSmallStays(searchObj);
  } catch (error) {
    console.error("error:", error);
  }

  if (!stays) return;
  return (
    <>
      <StayFilter />
      <StayList stays={stays} />
      <LoginPage />
    </>
  );
}
