import StayList from "@/components/StayList/StayList";
import { Suspense } from "react";


export default async function Home() {
  return (
    <section>
      <Suspense fallback={<div>Loading more...</div>}>
      <StayList  />
      </Suspense>
    </section>
  );
}
