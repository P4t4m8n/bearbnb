import { DynamicSVG } from "@/components/svgs/svgs";
import styles from "./AmentiasList.module.scss";
import { AmenityModel } from "@/model/amenity.model";

interface Props {
  amenities: AmenityModel[];
}

export default function AmentiasList({ amenities }: Props) {
  console.log("amenities:", amenities);
  return (
    <section className={styles.amentiasList}>
      <h2>What this place offers</h2>
      <ul>
        {amenities.map((amenity, idx) => (
          <li key={idx}>
            <DynamicSVG path={amenity.path} viewBox={amenity.viewBox} />
            <h3>{amenity.name}</h3>
          </li>
        ))}

        <button>show all 42 amenities</button>
      </ul>
    </section>
  );
}
