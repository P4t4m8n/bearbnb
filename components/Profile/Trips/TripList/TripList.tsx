import styles from "./TripList.module.scss";
import TripPreview from "../TripePreview/TripPreview";
import { getTripsByFilter } from "@/actions/trip.action";

export default async function TripList({ userId }: { userId: string }) {
  const trips = await getTripsByFilter({ userId });

  return (
    <ul className={styles.tripList}>
      {trips.map((trip) => (
        <TripPreview userId={userId} trip={trip} key={trip.bookingId} />
      ))}
    </ul>
  );
}
