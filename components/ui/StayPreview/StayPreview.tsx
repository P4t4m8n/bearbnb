import Image from "next/image";
import { RatingSVG } from "../svgs/svgs";
import styles from "./StayPreview.module.scss";
import Link from "next/link";
import { StaySmallModel } from "@/model/stay.model";
import { formatDatesToRange } from "@/service/stay.service";
import dynamic from "next/dynamic";
import LikeButton from "../Buttons/LikeButton/LikeButton";

const Distance = dynamic(() => import("./Distance/Distance"), { ssr: false });

interface Props {
  stay: StaySmallModel;
}
export default function StayPreview({ stay }: Props) {
  const { rating, price, location, images, id, firstAvailableDate } = stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));

  const availableDate = formatDatesToRange(firstAvailableDate);

  return (
    <li className={styles.stayPreview}>
      <Link href={`stay/${id}`}>
        <LikeButton stayId={stay.id} />
        <div className={styles.imgCon}>
          <Image
            sizes="auto"
            src={images[0].url}
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
        <Distance location={stay.location} /> <h6>{availableDate}</h6>
        <div className={styles.price}>
          <h3>{price}$</h3>
          <h5>night</h5>
        </div>
      </Link>
    </li>
  );
}
