import { StaySmall } from "./model/stay.model";
import { getSmallStays } from "./service/stay-service";
import StayFilter from "./ui/StayFilter/StayFilter";
import StayList from "./ui/StayList/StayList";

export default async function Home() {
  let stays: StaySmall[] | undefined = [];
  try {
    stays = await getSmallStays();
  } catch (error) {}

  if (!stays) return;
  return (
    <>
      <StayFilter />
      <StayList stays={stays} />
    </>
  );
}
