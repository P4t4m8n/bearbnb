import { FilterSVG } from "../svgs/svgs";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";

export default function StayFilter() {
  return (
    <div className={styles.filter}>
      <IconList />
      <button className={styles.filterBtn}>
        <FilterSVG />
        <p>Filters</p>
      </button>
    </div>
  );
}
