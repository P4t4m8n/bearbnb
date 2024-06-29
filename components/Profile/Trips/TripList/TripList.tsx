import { getUserTrips } from "@/service/booking.server";
import styles from "./TripList.module.scss";
import TripPreview from "../TripePreview/TripPreview";

export default async function TripList({ userId }: { userId: string }) {
  const trips = await getUserTrips(userId);

  return (
    <ul className={styles.tripList}>
      {trips.map((trip) => (
        <TripPreview userId={userId} trip={trip} key={trip.id} />
      ))}
    </ul>
  );
}
