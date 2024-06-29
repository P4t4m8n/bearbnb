import { getBookingById } from "@/service/booking.server";
import styles from "./BookingDetails.module.scss";
import StayMap from "@/components/ui/Map/Map";
interface Props {
  params: { id: string };
}

export default async function BookingDetails({ params }: Props) {
  const { id } = params;
  const booking = await getBookingById(id);
  return (
    <section className={styles.bookingDetails}>
      <div className={styles.bookingInfo}></div>
     <StayMap/>
    </section>
  );
}
