import { formatDatesToRange } from "@/service/stay.service";
import Image from "next/image";
import styles from "./TripPreview.module.scss";
import Link from "next/link";
import { TripModel } from "@/model/booking.model";

export default function TripPreview({
  trip,
  userId,
}: {
  trip: TripModel;
  userId: string;
}) {
  const { id, image, city, hostName, checkIn, checkOut, stayId } = trip;

  const dates = formatDatesToRange([new Date(checkIn!), new Date(checkOut!)]);
  const year = new Date(checkIn!).getFullYear();
  return (
    <li key={id}>
      <div className={styles.imgCon}>
        <Image src={image} alt="" width={64} height={64} />
      </div>
      <div className={styles.info}>
        <h2>{city}</h2>
        <h3>{`Hosted by ${hostName}`}</h3>
        <h3>{`${dates}, ${year}`}</h3>
      </div>
      <div className={styles.actions}>
        <Link
          className={styles.trip}
          href={{
            pathname: `/review/edit/`,
            query: { stayId: stayId, bookingId: id, userId: userId },
          }}
        >
          Review
        </Link>
        <Link className={styles.trip} href={`/booking/${id}`}>
          Booking
        </Link>
      </div>
    </li>
  );
}
