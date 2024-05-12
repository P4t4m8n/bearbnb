import TripPreview from "@/components/ui/Profile/Trips/TripePreview/TripPreview";
import { getUserTrips } from "@/service/booking.server";
import styles from "./trip.module.scss";

export default async function Trips({ params }: { params: { id: string } }) {
  const { id } = params;
  const trips = await getUserTrips(id);

  if (!trips) return <div>...loading</div>;
  return (
    <ul className={styles.tripList}>
      {trips.map((trip) => (
        <TripPreview trip={trip} key={trip.id} />
      ))}
    </ul>
  );
}
