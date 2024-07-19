import { MinusSVG, PlusSVG } from "@/components/svgs/svgs";
import styles from "./StayEditBasics.module.scss";

interface Props {
  capacity: number;
  bedRooms: number;
  baths: number;
  handleBasic: (type: "capacity" | "bedRooms" | "baths", value: number) => void;
}
export default function StayEditBasics({
  capacity,
  bedRooms,
  baths,
  handleBasic,
}: Props) {
  return (
    <section className={styles.basics}>
      <div className={styles.basicsHeader}>
        <h1>Share some basics about your place</h1>
        <p>{`You'll add more details later,like bed types`}</p>
      </div>
      <ul className={styles.basicsList}>
        <li>
          <h2>Guests</h2>
          <div className={styles.actions}>
            <button
              onClick={() => handleBasic("capacity", capacity - 1)}
              disabled={capacity <= 1}
              className={capacity <= 1 ? styles.disable : ""}
            >
              <MinusSVG />
            </button>
            <h4>{capacity}</h4>
            <button onClick={() => handleBasic("capacity", capacity + 1)}>
              <PlusSVG />
            </button>
          </div>
        </li>
        <li>
          <h2>Bedrooms</h2>
          <div className={styles.actions}>
            <button
              onClick={() => handleBasic("bedRooms", 0)}
              disabled={bedRooms <= 0}
              className={bedRooms <= 0 ? styles.disable : ""}
            >
              <MinusSVG />
            </button>
            <h4>{bedRooms}</h4>
            <button onClick={() => handleBasic("bedRooms", 1)}>
              <PlusSVG />
            </button>
          </div>
        </li>
        <li>
          <h2>Bathrooms</h2>

          <div className={styles.actions}>
            <button
              onClick={() => handleBasic("baths", baths - 1)}
              disabled={baths <= 0}
              className={baths <= 0 ? styles.disable : ""}
            >
              <MinusSVG />
            </button>
            <h4>{baths}</h4>
            <button onClick={() => handleBasic("baths", baths + 1)}>
              <PlusSVG />
            </button>
          </div>
        </li>
      </ul>
    </section>
  );
}
