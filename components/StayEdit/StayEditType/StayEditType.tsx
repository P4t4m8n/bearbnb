import { StayType } from "@/model/stay.model";
import styles from "./StayEditType.module.scss";
import { StayTypeSVG } from "@/components/svgs/stayTypeSvgs";
import { useMemo } from "react";

interface Props {
  selectedType: StayType;
  onStayTypeChange: (type: StayType) => void;
}

export default function StayEditType({
  selectedType,
  onStayTypeChange,
}: Props) {
  const stayTypes: StayType[] = useMemo(
    () => [
      "House",
      "Apartment",
      "Barn",
      "Bed & breakfast",
      "Cabin",
      "Mobile home",
      "Castle",
      "Houseboat",
      "Tiny home",
      "Hotel",
      "Farm",
    ],
    []
  );

  return (
    <div className={styles.stayTypeContainer}>
      <h1>Which of these best describes your place?</h1>
      <ul className={styles.stayTypeList}>
        {stayTypes.map((stayType) => (
          <li key={stayType}>
            <button
              className={`${styles.typeBtn} ${
                selectedType === stayType ? styles.typeSelected : ""
              }`}
              onClick={() => onStayTypeChange(stayType)}
            >
              <StayTypeSVG stayType={stayType} />
              <h3>{stayType}</h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
