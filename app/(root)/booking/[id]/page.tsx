import { getBookingById } from "@/actions/booking.action";
import styles from "./BookingDetails.module.scss";
interface Props {
  params: { id: string };
}

export default async function BookingDetails({ params }: Props) {
  const { id } = params;
  const booking = await getBookingById(id);
  return (
    <section className={styles.bookingDetails}>
      <div className={styles.bookingInfo}></div>
    </section>
  );
}
