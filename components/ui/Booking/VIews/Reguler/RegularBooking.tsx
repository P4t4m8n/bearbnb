import { daysBetweenDates } from "@/service/booking-service";
import styles from "./RegularBooking.module.scss";
import { BookingModel, GuestsModel, Stay } from "@/model/stay.model";
import { useRef } from "react";
import { getDefaultDates } from "@/service/stay.service";
import { Guests } from "../../Guests/Guests";
import { Calendar } from "@/components/ui/Calendar/Calendar";

interface Props {
  booking: BookingModel;
  stay: Stay;
  isCalenderOpen: boolean;
  diffInDays: number;
  setBooking: (booking: BookingModel) => void;
  onBook: () => void;
  setCalenderOpen: (value: boolean) => void;
}
export default function RegularBooking({
  booking,
  stay,
  diffInDays,
  setBooking,
  onBook,
  setCalenderOpen,
  isCalenderOpen,
}: Props) {
  const calendarModalRef = useRef<HTMLDivElement | null>(null);

  const { price } = stay;
  const { formatCheckIn, formatCheckOut } = getDefaultDates(stay, booking);

  const setGuests = (guests: GuestsModel) => {
    const tempBooking = { ...booking, ...guests };
    setBooking(tempBooking);
  };


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
              {`${formatCheckIn.day}/${formatCheckIn.month}/${formatCheckIn.year}` ||
                "Add date"}
            </p>
          </div>
          <div>
            <span>CHECKOUT</span>
            <p>
              {formatCheckOut.day
                ? `${formatCheckOut.day}/${formatCheckOut.month}/${formatCheckOut.year}`
                : "Add date"}
            </p>
          </div>
        </button>
        <Guests setGuests={setGuests} guests={guests} />
        {isCalenderOpen && (
          <div ref={calendarModalRef} className={styles.calendarCon}>
            <Calendar
              bookings={stay.booking}
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
