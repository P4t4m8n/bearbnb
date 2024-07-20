import { AmenityModel, GroupedAmenities } from "@/model/amenity.model";
import styles from "./StayEditPreviewAmenities.module.scss";
import { DynamicSVG } from "@/components/svgs/svgs";
interface Props {
  amenities: AmenityModel[];
}
export default function StayEditPreviewAmenities({ amenities }: Props) {
  const groupedAmenities: GroupedAmenities = amenities.reduce<GroupedAmenities>(
    (acc, amenity) => {
      const { category } = amenity;
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push({
        _id: amenity._id,
        path: amenity.path,
        category: amenity.category,
        name: amenity.name,
        viewBox: amenity.viewBox,
      });
      return acc;
    },
    {}
  );
  return (
    <ul className={styles.editPreviewAmenitiesLists}>
      {Object.keys(groupedAmenities).map((category) => (
        <li key={category}>
          <h3>{category}</h3>
          <ul className={styles.editAmenityList}>
            {groupedAmenities[category].map((amenity) => (
              <li key={amenity._id}>
                <h4>{amenity.name}</h4>
                <DynamicSVG path={amenity.path!} viewBox={amenity.viewBox!} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
