import { AmenityModel, GroupedAmenities } from "@/model/amenity.model";
import styles from "./StayEditAmenities.module.scss";
import { DynamicSVG } from "@/components/svgs/svgs";

interface Props {
  amenities: AmenityModel[];
  userAmenities: AmenityModel[];
  handleAmenity: (amenity: Partial<AmenityModel>) => void;
}
export default function StayEditAmenities({
  amenities,
  userAmenities,
  handleAmenity,
}: Props) {
  const groupedAmenities: GroupedAmenities = amenities.reduce<GroupedAmenities>(
    (acc, amenity) => {
      const { category } = amenity;
      if (!acc[category]) {
        acc[category] = [];
      }
      const isChecked = userAmenities.some(
        (checkedAmenity) => checkedAmenity._id === amenity._id
      );
      acc[category].push({
        _id: amenity._id,
        path: amenity.path,
        category: amenity.category,
        name: amenity.name,
        viewBox: amenity.viewBox,
        isChecked,
      });
      return acc;
    },
    {}
  );
  return (
    <section className={styles.editAmenities}>
      <div className={styles.editAmenitiesHeader}>
        <h1>Tell guests what your place has to offer</h1>
        <p>You can add amenities also after you publish your listing</p>
      </div>
      <ul className={styles.editAmenitiesLists}>
        {Object.keys(groupedAmenities).map((category) => (
          <li key={category}>
            <h3>{category}</h3>
            <ul className={styles.editAmenityList}>
              {groupedAmenities[category].map((amenity) => (
                <button
                className={amenity.isChecked ? styles.selected : ""}
                  onClick={() => handleAmenity(amenity)}
                  key={amenity._id}
                >
                  <DynamicSVG path={amenity.path!} viewBox={amenity.viewBox!} />
                  <h4>{amenity.name}</h4>
                </button>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
