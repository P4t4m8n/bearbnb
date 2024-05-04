import { StaySmall } from "@/model/stay.model";
import StayPreview from "../StayPreview/StayPreview";
import styles from "./StayList.module.scss";
interface Props {
  stays: StaySmall[];
}

export default function StayList({ stays }: Props) {
  return (
    <ul className={styles.stayList}>
      {stays.map((stay) => (
        <StayPreview key={stay.id} stay={stay} />
      ))}
    </ul>
  );
}
