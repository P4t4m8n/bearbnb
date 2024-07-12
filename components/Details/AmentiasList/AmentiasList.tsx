import { DynamicSVG } from "@/components/svgs/svgs";
import styles from "./AmentiasList.module.scss";
import { AmenityModel } from "@/model/amenity.model";
import AmentiasListModel from "./AmentiasListModel/AmentiasListModel";

interface Props {
  amenities: AmenityModel[];
}

export default function AmentiasList({ amenities }: Props) {
  const visibleAmenities = amenities.slice(0, 10);
  return (
    <section className={styles.amentiasList}>
      <h2>What this place offers</h2>
      <ul className={styles.visibleAmenities}>
        {visibleAmenities.map((amenity, idx) => (
          <li key={idx}>
            <DynamicSVG path={amenity.path} viewBox={amenity.viewBox} />
            <h3>{amenity.name}</h3>
          </li>
        ))}
      </ul>
      <AmentiasListModel amenities={amenities} />
    </section>
  );
}
