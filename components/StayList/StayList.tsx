import styles from "./StayList.module.scss";
import LoadMore from "../LoadMore/LoadMore";
import { getSmallStaysJSX } from "@/actions/stay.action";
import { Suspense } from "react";

export default async function StayList() {
  const stays = await getSmallStaysJSX({});

  return (
    <ul className={styles.stayList}>
      <Suspense fallback={<div>Loading more...</div>}>
      {stays}
      <LoadMore />
      </Suspense>
    </ul>
  );
}
