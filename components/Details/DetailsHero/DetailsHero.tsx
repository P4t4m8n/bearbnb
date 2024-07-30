import { GuestStayType } from "@/model/stay.model";
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
  guestStay: GuestStayType;
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
  guestStay,
}: Props) {
  return (
    <div className={styles.detailsHero}>
      <h2 className={styles.detailsHeroHeader}>
        {`${guestStay} in ${city}, ${country}`}
      </h2>
      <div className={styles.stayInfo}>
        <h3>{capacity} guests</h3>
        <h3>{numOfBedrooms} bedroom</h3>
        <h3>{numberOfBeds} beds</h3>
        <h3>{baths} bath</h3>
      </div>
      <div className={styles.rating}>
        <RatingSVG />
        <p>{rating||"New"}</p>
        <a> {reviewsLength || 0} reviews</a>
      </div>
    </div>
  );
}
