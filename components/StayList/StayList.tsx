import styles from "./StayList.module.scss";
import LoadMore from "../LoadMore/LoadMore";
import { getSmallStaysJSX } from "@/actions/stay.action";

export default async function StayList({ filterBy }: any) {
  const stays = await getSmallStaysJSX(filterBy);

  return (
    <ul className={styles.stayList}>
      {stays}
      {/* <LoadMore /> */}
    </ul>
  );
}
