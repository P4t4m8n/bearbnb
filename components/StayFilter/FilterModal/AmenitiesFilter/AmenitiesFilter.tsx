import { AmenitySmallModel, GroupedAmenities } from "@/model/amenity.model";
import styles from "./AmenitiesFilter.module.scss";

interface Props {
  amenities: AmenitySmallModel[];
}
export default function AmenitiesFilter({ amenities }: Props) {
  const groupedAmenities: GroupedAmenities = amenities.reduce<GroupedAmenities>(
    (acc, amenity) => {
      const { category } = amenity;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(amenity);
      return acc;
    },
    {}
  );

  for (const category in groupedAmenities) {
    groupedAmenities[category].sort((a, b) => a.name.localeCompare(b.name));
  }
  return (
    <div className={styles.amenities}>
      <h2>Amenities</h2>
      <ul>
        {Object.keys(groupedAmenities).map((category) => (
          <li key={category}>
            <h3>{category}</h3>
            <ul>
              {groupedAmenities[category].map((amenity) => (
                <li key={amenity._id}>
                  <div className={styles.customCheckbox}>
                    <input type="checkbox" id={amenity._id} hidden />
                    <label htmlFor={amenity._id} />
                  </div>
                  <h4>{amenity.name}</h4>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
