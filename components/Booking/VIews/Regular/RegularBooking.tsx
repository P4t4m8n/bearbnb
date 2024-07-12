import styles from "./RegularBooking.module.scss";
import { StayModel } from "@/model/stay.model";
import { useRef } from "react";
import { getDefaultDates } from "@/service/stay.service";
import { Guests } from "../../Guests/Guests";
import { BookingModel } from "@/model/booking.model";
import { GuestsModel } from "@/model/guest.model";
import { Calendar } from "@/components/Calendar/Calendar";
import { useModal } from "@/hooks/useModal";

interface Props {
  booking: BookingModel;
  stay: StayModel;
  diffInDays: number;
  onDateClick: (date: Date) => void;
  setGuests: (guests: GuestsModel) => void;
  onBook: () => void;
}

export default function RegularBooking({
  booking,
  stay,
  diffInDays,
  onDateClick,
  setGuests,
  onBook,
}: Props) {
  const calendarModalRef = useRef<HTMLDivElement | null>(null);
  const [calenderOpen, setCalenderOpen] = useModal(calendarModalRef, null);
  const { price } = stay;

  // Ensure checkIn and checkOut have valid Date values
  const { checkIn, checkOut } = booking;

  // Get formatted check-in and check-out dates
  const { formatCheckIn, formatCheckOut } = getDefaultDates(stay, {
    checkIn,
    checkOut,
  });

  // Consolidate guest information into an object
  const guests = {
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
  };

  return (
    <section className={styles.booking}>
      <header>
        <h1>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h1>
        <h3>night</h3>
      </header>
      <div className={styles.bookingInfo}>
        <button onClick={() => setCalenderOpen(true)} className={styles.dates}>
          <div>
            <span>CHECK-IN</span>
            <p>
              {formatCheckIn.day && formatCheckIn.month && formatCheckIn.year
                ? `${formatCheckIn.day}/${formatCheckIn.month}/${formatCheckIn.year}`
                : "Add date"}
            </p>
          </div>
          <div>
            <span>CHECKOUT</span>
            <p>
              {formatCheckOut.day && formatCheckOut.month && formatCheckOut.year
                ? `${formatCheckOut.day}/${formatCheckOut.month}/${formatCheckOut.year}`
                : "Add date"}
            </p>
          </div>
        </button>
        <Guests setGuests={setGuests} guests={guests} />
        {calenderOpen && (
          <div ref={calendarModalRef} className={styles.calendarCon}>
            <Calendar
              bookingDate={{ start: booking.checkIn, end: booking.checkOut }}
              onDateClick={onDateClick}
              bookings={stay.bookings}
              date={booking.checkIn || new Date()}
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
