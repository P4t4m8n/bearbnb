import Image from "next/image";
import { StaySmall } from "../../model/stay.model";
import { LikeSVG, RatingSVG } from "../svgs/svgs";
import { faker } from "@faker-js/faker";
import styles from "./StayPreview.module.scss";
import Link from "next/link";

interface Props {
  stay: StaySmall;
}
export default function StayPreview({ stay }: Props) {
  const { rating, price, location, image, id } = stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));
  const distance = faker.number.int({ min: 10, max: 1200 });

  return (
    <li className={styles.stayPreview}>
      <Link href={`stay/${id}`}>
        <LikeSVG className={styles.likeSvg} />
        <div className={styles.imgCon}>
          <Image
            src={image}
            fill={true}
            alt=""
            className={styles.image}
          ></Image>
        </div>
        <div className={styles.infoHead}>
          <h3>
            {city}, {country}
          </h3>
          <div className={styles.rating}>
            <RatingSVG className={styles.ratingSvg} />
            <h5>{roundNum}</h5>
          </div>
        </div>
        <h6>{distance} kilometers away</h6>
        <h6>May 7-12</h6>
        <div className={styles.price}>
          <h3>{price}$</h3>
          <h5>night</h5>
        </div>
      </Link>
    </li>
  );
}
