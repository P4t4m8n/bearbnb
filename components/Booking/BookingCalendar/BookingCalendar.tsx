import { useRef } from "react";
import styles from "./BookingCalendar.module.scss";
import { useModal } from "@/hooks/useModal";
import { Calendar } from "@/components/Calendar/Calendar";
import { BookingModel, BookingSmallModel } from "@/model/booking.model";
import { fixedDatesForMobile, getDefaultDates } from "@/service/stay.service";

interface Props {
  booking: BookingModel;
  bookings: BookingSmallModel[];
  firstAvailableDate: Date[] | null | undefined;
  setBooking: (booking: BookingModel) => void;
}

export default function BookingCalendar({
  booking,
  bookings,
  firstAvailableDate,
  setBooking,
}: Props) {
  const calendarModelRef = useRef<HTMLDivElement | null>(null);
  const [isModelOpen, setIsModelOpen] = useModal(calendarModelRef);
  const isStart = useRef(true);

  const { checkIn, checkOut } = booking;
  const { formatCheckIn, formatCheckOut } = getDefaultDates(
    firstAvailableDate,
    {
      checkIn,
      checkOut,
    }
  );
  const fixedDates = fixedDatesForMobile({ start: checkIn, end: checkOut });

  const onDateClick = (date: Date) => {
    if (!date) return;

    if (isStart.current) {
      const newCheckOut =
        booking.checkOut && date >= booking.checkOut ? date : booking.checkOut;
      setBooking({ ...booking, checkIn: date, checkOut: newCheckOut || null });
      isStart.current = false;
    } else {
      const newCheckIn = date < booking.checkIn ? date : booking.checkIn;
      setBooking({ ...booking, checkIn: newCheckIn, checkOut: date });
      isStart.current = true;
    }
  };

  const clearDates = () => {
    setBooking({
      ...booking,
      checkIn: firstAvailableDate![0],
      checkOut: firstAvailableDate![2],
    });
  };

  return (
    <div className={styles.con}>
      <button onClick={() => setIsModelOpen(true)} className={styles.dates}>
        <div className={`${styles.datesBig} ${styles.left}`}>
          <span>CHECK-IN</span>
          <p>
            {formatCheckIn.day && formatCheckIn.month && formatCheckIn.year
              ? `${formatCheckIn.day}/${formatCheckIn.month}/${formatCheckIn.year}`
              : "Add date"}
          </p>
        </div>
        <div className={styles.datesBig}>
          <span>CHECKOUT</span>
          <p>
            {formatCheckOut.day && formatCheckOut.month && formatCheckOut.year
              ? `${formatCheckOut.day}/${formatCheckOut.month}/${formatCheckOut.year}`
              : "Add date"}
          </p>
        </div>
        <h2 className={styles.datesMobile}>{fixedDates}</h2>
      </button>

      {isModelOpen && (
        <div ref={calendarModelRef} className={styles.calendarCon}>
          <Calendar
            bookingDate={{ start: checkIn, end: checkOut }}
            onDateClick={onDateClick}
            bookings={bookings}
            date={checkIn || new Date()}
            clearDates={clearDates}
          />
        </div>
      )}
    </div>
  );
}
