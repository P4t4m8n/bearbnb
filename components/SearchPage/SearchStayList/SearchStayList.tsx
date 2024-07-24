import { StaySmallModel } from "@/model/stay.model";
import styles from "./SearchStayList.module.scss";
import StayPreview from "@/components/StayPreview/StayPreview";

interface Props {
  stays: StaySmallModel[];
  daysAmount?: number;
}
export default function SearchStayList({ stays, daysAmount }: Props) {
  const city =
    stays[0].location.city
  return (
    <div className={styles.con}>
      <h1>Places in {city}</h1>
      <ul className={styles.searchStayList}>
        {stays.map((stay) => (
          <StayPreview key={stay._id} stay={stay} daysAmount={daysAmount} />
        ))}
      </ul>
    </div>
  );
}
