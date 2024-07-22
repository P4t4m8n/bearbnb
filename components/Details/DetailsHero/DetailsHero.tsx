import { RatingSVG } from "../../svgs/svgs";
import styles from "./DetailsHero.module.scss";

interface Props {
  capacity: number;
  numOfBedrooms: number;
  numberOfBeds: number;
  baths: number;
  rating: number;
  reviewsLength: number;
  country: string;
  city: string;
}

export function DetailsHero({
  capacity,
  numOfBedrooms,
  numberOfBeds,
  baths,
  rating,
  reviewsLength,
  country,
  city,
}: Props) {
  return (
    <div className={styles.detailsHero}>
      <div className={styles.detailsHeroHeader}>
        <h2>{city}</h2>
        <h2>{", " + country}</h2>
      </div>
      <div className={styles.stayInfo}>
        <h3>{capacity} guests</h3>
        <h3>{numOfBedrooms} bedroom</h3>
        <h3>{numberOfBeds} beds</h3>
        <h3>{baths} bath</h3>
      </div>
      <div className="rating">
        <RatingSVG className="" />
        <p>{rating}</p>
        <a> {reviewsLength || 0} reviews</a>
      </div>
    </div>
  );
}
