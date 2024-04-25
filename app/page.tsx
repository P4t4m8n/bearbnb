import { getStays } from "./service/stay-service";
import StayFilter from "./ui/stay-filter";
import StayList from "./ui/StayList";

export default async function Home() {
  let stays = await getStays();
  
  if (!stays) return;
  return (
    <main className=" ">
      <StayFilter />
      <StayList stays={stays} />
    </main>
  );
}
