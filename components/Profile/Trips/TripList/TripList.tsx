import styles from "./TripList.module.scss";
import TripPreview from "../TripePreview/TripPreview";
import { getTripsByFilter } from "@/actions/trip.action";
import { getBookings } from "@/actions/booking.action";

export default async function TripList({ userId }: { userId: string }) {
  const bookings = await getBookings({ userId });

  return (
    <ul className={styles.tripList}>
      {bookings.map((booking) => (
        <TripPreview userId={userId} booking={booking} key={booking._id} />
      ))}
    </ul>
  );
}
