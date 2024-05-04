import StayFilter from "@/components/ui/StayFilter/StayFilter";
import StayList from "@/components/ui/StayList/StayList";
import { StaySmall } from "@/model/stay.model";
import LoginPage from "./login/page";
import { getSmallStays } from "@/service/stay-service";

export default async function Home() {
  let stays: StaySmall[] | undefined = [];

  try {
    stays = await getSmallStays();
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
