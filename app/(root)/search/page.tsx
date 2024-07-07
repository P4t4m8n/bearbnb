import StayList from "@/components/StayList/StayList";

interface Props {
  searchParams: any;
}
export default function StaySearchPage({ searchParams }: Props) {
  console.log("searchParams:", searchParams);
  return (
    <section>
      <StayList searchParams={searchParams} />
      <div>Placeholder</div>
    </section>
  );
}
