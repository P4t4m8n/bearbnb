import styles from "./StayList.module.scss";
import LoadMore from "../LoadMore/LoadMore";
import { getSmallStaysJSX } from "@/actions/stay.action";

export default async function StayList() {
  const stays = await getSmallStaysJSX({});
  

  return (
    <ul className={styles.stayList}>
      {stays}
      <LoadMore />
    </ul>
  );
}
