import { StaySmallModel } from "@/model/stay.model";
import Image from "next/image";
import styles from "./MyStayPreview.module.scss";

interface Props {
  stay: StaySmallModel;
  idx: number;
}

export default function MyStayPreview({ stay, idx }: Props) {
  const { type, price, location, rating, id, images, name } = stay;
  const { city, country } = location;
  return (
    <li className={styles.preview}>
      <h3>{idx}</h3>
      <div>
        <Image src={images[0]} width={64} height={64} alt={name} />
        <h3>{name}</h3>
      </div>
      <h3 className={styles.price}>{price}</h3>
      <h3>
        {city}, {country}
      </h3>
      <h3 className={styles.rating}>{rating}</h3>
      <h3>{type}</h3>
      <div className={styles.actions}>
        <button>View</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
