import styles from "./StayList.module.scss";
import { getSmallStaysJSX } from "@/service/stay.server";
import LoadMore from "../LoadMore/LoadMore";
import { FilterByModel } from "@/model/filters.model";
import { LabelModel } from "@/model/stay.model";
import { LabelsType } from "@/model/labels.type";
interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    name: string;
    label: LabelsType;
  };
}

export default async function StayList({ searchParams }: Props) {
  console.log("searchParams:", searchParams);
  let stays: React.JSX.Element[] | undefined = [];
  const { startDate, endDate } = searchParams;
  const searchObj: FilterByModel = {
    dates: {
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    },
    priceRange: { start: 1, end: 999999999999 },
    location: "",
    name: searchParams.name || "",
    label: searchParams.label || "",
  };
  try {
    stays = await getSmallStaysJSX(searchObj);
  } catch (error) {
    console.error("error:", error);
  }
  console.log("stays:", stays)
  return (
    <ul className={styles.stayList}>
      {stays}
      <LoadMore />
    </ul>
  );
}
