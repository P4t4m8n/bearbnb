import styles from "./StayList.module.scss";
import LoadMore from "../LoadMore/LoadMore";
import { getSmallStaysJSX } from "@/actions/stay.action";
import { Suspense } from "react";
import { FilterByModel, SearchParamsModel } from "@/model/filters.model";

interface Props {
  searchParams: SearchParamsModel;
}
export default async function StayList({ searchParams }: Props) {
  const stays = await getSmallStaysJSX(searchParams);

  return (
    <ul className={styles.stayList}>
      {stays}
      <Suspense fallback={<div>Loading...</div>}>
        <LoadMore />
      </Suspense>
    </ul>
  );
}
