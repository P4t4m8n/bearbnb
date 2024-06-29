import StayFilter from "@/components/StayFilter/StayFilter";
import StayList from "@/components/StayList/StayList";

export default async function Home() {
  return (
    <section>
      <StayFilter />
      <StayList/>
    </section>
  );
}
