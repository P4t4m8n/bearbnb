import { SearchBY, StaySmall } from "@/model/stay.model";
import StayPreview from "../StayPreview/StayPreview";
import styles from "./StayList.module.scss";
import { Suspense } from "react";
import StayListSkeleton from "../skeletons/StayListSkeleton/StayListSkeleton";
import { getSmallStays } from "@/service/stay.server";
interface Props {
  // stays: StaySmall[];
  searchParams: any;
}

export default async function StayList({ searchParams }: Props) {
  let stays: StaySmall[] | undefined = [];

  const searchObj: SearchBY = {
    dates: {
      start: searchParams.startDate ? new Date(searchParams.startDate) : null,
      end: searchParams.endDate ? new Date(searchParams.endDate) : null,
    },
    priceRange: { start: 1, end: 999999999999 },
    location: "",
    name: searchParams.name || "",
  };
  try {
    stays = await getSmallStays(searchObj);
  } catch (error) {
    console.error("error:", error);
  }
  return (
    <Suspense fallback={<StayListSkeleton />}>
      <ul className={styles.stayList}>
        {stays!.map((stay) => (
          <StayPreview key={stay.id} stay={stay} />
        ))}
      </ul>
    </Suspense>
  );
}
