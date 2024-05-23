import styles from "./StayList.module.scss";
import { getSmallStaysJSX } from "@/service/stay.server";
import LoadMore from "../LoadMore/LoadMore";
import { FilterByModel, SearchParamsModel, Type } from "@/model/filters.model";
import { searchParamsToFilter } from "@/service/stay.service";
interface Props {
  searchParams: SearchParamsModel;
}

export default async function StayList({ searchParams }: Props) {
  let stays: React.JSX.Element[] | undefined = [];
  const searchObj: FilterByModel = searchParamsToFilter(searchParams);
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
