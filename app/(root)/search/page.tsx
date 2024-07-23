import StayList from "@/components/StayList/StayList";

interface Props {
  searchParams: any;
}
export default function StaySearchPage({ searchParams }: Props) {
  return (
    <section>
      <StayList searchParams={searchParams} />
    </section>
  );
}
