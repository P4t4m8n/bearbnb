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
  address: string;
}

export function DetailsHero({
  capacity,
  numOfBedrooms,
  numberOfBeds,
  baths,
  rating,
  reviewsLength,
  country,
  address,
}: Props) {
  return (
    <div className={styles.detailsHero}>
      <header>
        <h2>{address}</h2>
        <h2>{", " + country}</h2>
      </header>
      <div className="stayInfo">
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
