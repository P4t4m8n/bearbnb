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
  isSearch?: boolean;
  isMap?: boolean;
  daysAmount?: number;
}
export default function StayPreview({
  stay,
  isSearch,
  isMap,
  daysAmount,
}: Props) {
  const { rating, price, location, images, _id, firstAvailableDate, currency } =
    stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));

  const availableDate = formatDatesToRange(firstAvailableDate);

  return (
    <li className={styles.stayPreview}>
      <Link href={`stay/${_id}`}>
        <LikeButton stayId={stay._id!} />
        <div className={styles.imgCon}>
          <Image
            sizes="auto"
            src={images[0]}
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
            <RatingSVG  />
            <h5>{roundNum > 0 ? roundNum : "New"}</h5>
          </div>
        </div>
        {!isSearch && isMap && <Distance location={stay.location} />}
        <h6>{availableDate}</h6>
        <div className={styles.price}>
          <h3>
            {currency}
            {price}
          </h3>
          <h5>night</h5>
          {daysAmount && (
            <p>
              {currency}
              {daysAmount * price} total
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
