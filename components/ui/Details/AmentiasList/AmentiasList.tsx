import { WifiSVG } from "../../svgs/svgs";
import styles from "./AmentiasList.module.scss";

interface Props {
  amenities: { name: string }[];
}

export default function AmentiasList({ amenities }: Props) {
  return (
    <section className={styles.amentiasList}>
      <h2>What this place offers</h2>
      <ul>
        {amenities.map((amenity,idx) => (
          <li key={idx}>
            <WifiSVG />
            <h3>{amenity.name}</h3>
          </li>
        ))}
      
        <button>show all 42 amenities</button>
      </ul>
    </section>
  );
}
