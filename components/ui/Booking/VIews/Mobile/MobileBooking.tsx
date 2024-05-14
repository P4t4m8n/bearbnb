import { BookingModalSmall } from "@/model/stay.model";
import styles from "./MobileBooking.module.scss";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import { useRef } from "react";

interface Props {
  stayBooking: BookingModalSmall[];
  checkIn: Date;
  checkOut: Date;
  price: number;
  diffInDays: number;
  isCalenderOpen: boolean;
  setCalenderOpen: (value: boolean) => void;
  onBook: () => void;
}
export default function MobileBooking({
  stayBooking,
  checkIn,
  checkOut,
  price,
  diffInDays,
  isCalenderOpen,
  setCalenderOpen,
  onBook,
}: Props) {
  const calendarModalRef = useRef<HTMLDivElement | null>(null);

  const monthName = checkIn.toLocaleString("default", { month: "long" }) || "";

  return (
    <section className={styles.bookingSmall}>
      <div className={styles.smallDates} onClick={() => setCalenderOpen(true)}>
        <div>
          <h2>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h2>
          <h2>night</h2>
        </div>
        <h2>{`${monthName} ${checkIn?.getDay()} - ${checkOut?.getDay()}`}</h2>
      </div>
      <button onClick={() => onBook()} className={styles.bookBtn}>
        Reserve
      </button>

      {isCalenderOpen && (
        <div ref={calendarModalRef} className={styles.calendarCon}>
          <Calendar bookings={stayBooking} date={checkIn || new Date()} />
        </div>
      )}
    </section>
  );
}
