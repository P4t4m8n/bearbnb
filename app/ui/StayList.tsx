import { Stay } from "../model/stay.model";
import StayPreview from "./stay-preview";
import styles from "./StayList.module.scss";


interface Props {
  stays: Stay[];
}

export default function StayList({ stays }: Props) {
  return (
    <ul className={styles.list}>
      {stays.map((stay) => (
        <StayPreview key={stay.id} stay={stay} />
      ))}
    </ul>
  );
}
