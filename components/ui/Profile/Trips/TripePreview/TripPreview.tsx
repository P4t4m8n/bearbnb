import { TripModel } from "@/model/stay.model";
import { formatDatesToRange } from "@/service/stay.service";
import Image from "next/image";
import styles from "./TripPreview.module.scss";
import Link from "next/link";

export default function TripPreview({ trip }: { trip: TripModel }) {
  const { id, image, city, hostName, checkIn, checkOut } = trip;

  const dates = formatDatesToRange([new Date(checkIn), new Date(checkOut)]);
  const year = new Date(checkIn).getFullYear();
  return (
    <li key={id}>
      <Link className={styles.trip} href={`/booking/${id}`}>
        <div className={styles.imgCon}>
          <Image src={image} alt="" width={64} height={64} />
        </div>
        <div className={styles.info}>
          <h2>{city}</h2>
          <h3>{`Hosted by ${hostName}`}</h3>
          <h3>{`${dates}, ${year}`}</h3>
        </div>
      </Link>
    </li>
  );
}
