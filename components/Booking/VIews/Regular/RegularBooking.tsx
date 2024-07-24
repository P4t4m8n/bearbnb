import styles from "./RegularBooking.module.scss";
import { useRef } from "react";
import { fixedDatesForMobile, getDefaultDates } from "@/service/stay.service";
import { BookingModel, BookingSmallModel } from "@/model/booking.model";
import { GuestsModel } from "@/model/guest.model";
import { Calendar } from "@/components/Calendar/Calendar";
import { useModal } from "@/hooks/useModal";
import { GuestsWindow } from "@/components/Header/StaySearch/GuestsModel/GuestsModel";

interface Props {
  data: {
    price: number;
    checkIn: Date;
    checkOut: Date;
    formatCheckIn: {
      day: string;
      month: string;
      year: number;
    };
    formatCheckOut: {
      day: string;
      month: string;
      year: number;
    };
    diffInDays: number;
    bookings: BookingSmallModel[];
    booking: BookingModel;
    guests: {
      adults: number;
      children: number;
      infants: number;
      pets: number;
    };
  };
  onDateClick: (date: Date) => void;
  setGuests: (guests: GuestsModel) => void;
  clearDates: () => void;
  onBook: () => void;
}

export default function RegularBooking({
  data,
  clearDates,
  onDateClick,
  setGuests,
  onBook,
}: Props) {
  const calendarModalRef = useRef<HTMLDivElement | null>(null);
  const [calenderOpen, setCalenderOpen] = useModal(calendarModalRef, null);
  const {
    price,
    checkIn,
    checkOut,
    guests,
    diffInDays,
    bookings,
    formatCheckIn,
    formatCheckOut,
  } = data;
  const fixedDates = fixedDatesForMobile({ start: checkIn, end: checkOut });

  return (
    <section className={styles.booking}>
      <div className={styles.bookingHeader}>
        <h1>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h1>
        <h3>night</h3>
      </div>
      <div className={styles.bookingInfo}>
        <button onClick={() => setCalenderOpen(true)} className={styles.dates}>
          <div className={styles.datesBig}>
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
          <h2 className={styles.datesSmall}>{fixedDates}</h2>
        </button>
        <GuestsWindow setGuests={setGuests} guests={guests} isBooking={true} />
        {calenderOpen && (
          <div ref={calendarModalRef} className={styles.calendarCon}>
            <Calendar
              bookingDate={{ start: checkIn, end: checkOut }}
              onDateClick={onDateClick}
              bookings={bookings}
              date={checkIn || new Date()}
              clearDates={clearDates}
              closeCalendarModel={setCalenderOpen}
            />
          </div>
        )}
      </div>
      <button onClick={() => onBook()} className={styles.bookBtn}>
        Reserve
      </button>
      <div className={styles.price}>
        <h3>{`$${price} x ${diffInDays} nights`}</h3>
        <h3>${diffInDays * price}</h3>
      </div>
      <div className={styles.price}>
        <h3>Bearbnb honey fee</h3>
        <h3>$42</h3>
      </div>
      <div className={styles.price}>
        <h1>Total</h1>
        <h1>${diffInDays * price + 42}</h1>
      </div>
    </section>
  );
}
