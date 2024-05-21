import styles from "./StayList.module.scss";
import { getSmallStaysJSX } from "@/service/stay.server";
import LoadMore from "../LoadMore/LoadMore";
import { FilterByModel, Type } from "@/model/filters.model";
import { LabelModel } from "@/model/stay.model";
import { LabelsType } from "@/model/labels.type";
import { Amenity } from "@/model/amenities.type";
interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    name: string;
    label: LabelsType;
    type: Type;
    bedroomsAmount: number;
    totalBeds: number;
    baths: number;
    amenities: string;
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
    type: searchParams.type,
    bedroomsAmount: searchParams.bedroomsAmount
      ? searchParams.bedroomsAmount
      : 99,
    totalBeds: searchParams.totalBeds ? searchParams.totalBeds : 99,
    baths: searchParams.baths ? searchParams.baths : 99,
    amenities: (searchParams.amenities.split(",") as Amenity[]) || [],
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
