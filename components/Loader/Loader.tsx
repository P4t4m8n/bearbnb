import { StayType } from "@/model/stay.model";
import styles from "./Loader.module.scss";
import { StayTypeSVG } from "../svgs/stayTypeSvgs";

export default function Loader() {
  const svgNames: StayType[] = [
    "House",
    "Apartment",
    "Bed & breakfast",
    "Cabin",
    "Houseboat",
    "Tiny home",
    "Hotel",
    "Farm",
    "Castle",
    "Mobile home",
  ];
  return (
    <ul className={styles.conList}>
      {svgNames.map((svgName, idx) => (
        <li key={idx} className={styles.conItem}>
          <StayTypeSVG stayType={svgName} />
        </li>
      ))}
    </ul>
  );
}
