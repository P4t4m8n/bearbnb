import { formatDatesToRange } from "@/service/stay.service";
import Image from "next/image";
import styles from "./TripPreview.module.scss";
import Link from "next/link";
import { TripModel } from "@/model/trip.model";
import { BookingModel } from "@/model/booking.model";

interface Props {
  booking: BookingModel;
  userId: string;
}

export default function TripPreview({ booking, userId }: Props) {
  const { checkIn, checkOut, _id, stay, host } = booking;

  const dates = formatDatesToRange([new Date(checkIn), new Date(checkOut)]);
  const year = new Date(checkIn!).getFullYear();
  return (
    <li key={_id}>
      <div className={styles.imgCon}>
        <Image src={stay.image} alt="" width={64} height={64} />
      </div>
      <div className={styles.info}>
        <h2>{stay.location.city}</h2>
        <h3>{`Hosted by ${host.firstName}`}</h3>
        <h3>{`${dates}, ${year}`}</h3>
      </div>
      <div className={styles.actions}>
        <Link
          className={styles.trip}
          href={{
            pathname: `/review/edit/`,
            query: { stayId: stay._id, bookingId: _id, userId: userId },
          }}
        >
          Review
        </Link>
        <Link className={styles.trip} href={`/booking/${_id}`}>
          Booking
        </Link>
      </div>
    </li>
  );
}
