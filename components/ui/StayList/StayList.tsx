import { SearchBY } from "@/model/stay.model";
import styles from "./StayList.module.scss";
import { getSmallStays } from "@/service/stay.server";
import LoadMore from "../LoadMore/LoadMore";
import { Suspense } from "react";
import StayListSkeleton from "../skeletons/StayListSkeleton/StayListSkeleton";
interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    name: string;
  };
}

export default async function StayList({ searchParams }: Props) {
  let stays: React.JSX.Element[] | undefined = [];

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
    <ul className={styles.stayList}>
      {stays}
      <LoadMore />
    </ul>
  );
}
