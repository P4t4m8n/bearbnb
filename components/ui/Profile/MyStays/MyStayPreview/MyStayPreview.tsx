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
      <h4>xffxx{idx}</h4>
      <div>
        <Image src={images[0].url} width={64} height={64} alt={name} />
        <h4>{name}</h4>
      </div>
      <h4>{price}</h4>
      <h4>
        {city}, {country}
      </h4>
      <h4>{rating}</h4>
      <h4>{type}</h4>
      <div className={styles.actions}>
        <button>View</button>
        <button>Delete</button>
      </div>
    </li>
  );
}
