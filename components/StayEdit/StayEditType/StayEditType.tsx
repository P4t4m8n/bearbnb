import { StayType } from "@/model/stay.model";
import styles from "./StayEditType.module.scss";
import { StayTypeSVG } from "@/components/svgs/stayTypeSvgs";

interface Props {
  type: StayType;
  handleStayType: (type: StayType) => void;
}
export default function StayEditType({ type, handleStayType }: Props) {
  const stayTypes: StayType[] = [
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
  ];

  return (
    <div className={styles.pageTwo}>
      <h1>Which of these best describes your place?</h1>
      <ul className={styles.stayTypeList}>
        {stayTypes.map((_type, idx) => (
          <li key={idx}>
            <button
              className={`${styles.typeBtn} ${
                type === _type ? styles.typeSelected : ""
              }`}
              onClick={() => handleStayType(_type)}
            >
              <StayTypeSVG stayType={_type} />
              <h3>{_type}</h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
