import styles from "./StayList.module.scss";
import { getSmallStaysJSX } from "@/service/stay.server";
import LoadMore from "../LoadMore/LoadMore";
import { SearchByModel } from "@/model/filters.model";
interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    name: string;
  };
}

export default async function StayList({ searchParams }: Props) {
  let stays: React.JSX.Element[] | undefined = [];
  const { startDate, endDate } = searchParams;
  const searchObj: SearchByModel = {
    dates: {
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    },
    priceRange: { start: 1, end: 999999999999 },
    location: "",
    name: searchParams.name || "",
  };
  try {
    stays = await getSmallStaysJSX(searchObj);
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
