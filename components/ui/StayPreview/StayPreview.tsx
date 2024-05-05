import Image from "next/image";
import { LikeSVG, RatingSVG } from "../svgs/svgs";
import { faker } from "@faker-js/faker";
import styles from "./StayPreview.module.scss";
import Link from "next/link";
import { StaySmall } from "@/model/stay.model";

interface Props {
  stay: StaySmall;
}
export default function StayPreview({ stay }: Props) {
  const { rating, price, location, image, id, firstAvailableDate } = stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));
  const distance = faker.number.int({ min: 10, max: 1200 });

  const formatDatesToRange = (dates: Date[] | null | undefined): string => {
    if (!dates) return "";
    // Check if the dates array has exactly three dates
    if (dates.length !== 3) {
      throw new Error("The dates array must contain exactly three dates.");
    }

    // Sort dates just in case they are not in order
    dates.sort((a, b) => a.getTime() - b.getTime());

    // Extract the year, month, and day from the first date
    const firstDate = dates[0];
    const endDate = dates[2];

    // Format month and day
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const locale = "en-US"; // Adjust the locale based on your requirements

    const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(
      firstDate
    );
    const startDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
      firstDate
    );
    const endDay = new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
      endDate
    );

    // Build the final string
    return `${month} ${startDay} - ${endDay}`;
  };

  const availableDate = formatDatesToRange(firstAvailableDate);

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
        <h6>{availableDate}</h6>
        <div className={styles.price}>
          <h3>{price}$</h3>
          <h5>night</h5>
        </div>
      </Link>
    </li>
  );
}
