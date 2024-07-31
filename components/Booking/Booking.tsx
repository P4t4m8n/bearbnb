"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { StayModel } from "@/model/stay.model";
import { useUserStore } from "@/store/useUserStore";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfirmBookingModal";
import { daysBetweenDates, getEmptyBooking } from "@/service/booking.service";
import { BookingModel } from "@/model/booking.model";
import { GuestsModel } from "@/model/guest.model";

import { userToSmallUser } from "@/service/user.service";
import styles from "./Booking.module.scss";
import { GuestsWindow } from "../Header/StaySearch/GuestsModel/GuestsModel";
import BookingCalendar from "./BookingCalendar/BookingCalendar";

interface Props {
  stay: StayModel;
}

export default function Booking({ stay }: Props) {
  const { user } = useUserStore();
  const [booking, setBooking] = useState<BookingModel>(getEmptyBooking());
  const [bookingModal, setBookingModal] = useState(false);

  useEffect(() => {
    setBooking({
      ...booking,
      checkIn: stay.firstAvailableDate![0],
      checkOut: stay.firstAvailableDate![2],
    });
  }, []);

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        stay: {
          _id: stay._id!,
          name: stay.name,
          image: stay.images[0],
          price: +stay.price,
          type: stay.type,
          location: { city: stay.location.city },
        },
        user: userToSmallUser(user),
        host: stay.host,
      }));
    }
  }, [user]);

  const onBook = () => {
    if (!user) return alert("No user");

    const price = stay.price * diffInDays;
    setBooking((prev) => ({ ...prev, price }));
    setBookingModal(true);
  };

  const setGuests = (guests: GuestsModel) => {
    setBooking((prevBooking) => ({ ...prevBooking, ...guests }));
  };

  const confirmModalHelper = () => {
    setBookingModal(false);
  };

  // Calculate difference in days between check-in and check-out dates
  const diffInDays = useMemo(
    () =>
      booking.checkIn && booking.checkOut
        ? daysBetweenDates(booking.checkIn, booking.checkOut)
        : daysBetweenDates(
            stay.firstAvailableDate![0],
            stay.firstAvailableDate![2]
          ),
    [booking.checkIn, booking.checkOut]
  );

  const guests = {
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
  };

  const { price, bookings } = stay;

  return (
    <>
      <section className={styles.booking}>
        <div className={styles.bookingHeader}>
          <h1>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h1>
          <h3>night</h3>
        </div>
        <div className={styles.bookingInfo}>
          <BookingCalendar
            booking={booking}
            bookings={stay.bookings}
            setBooking={setBooking}
            firstAvailableDate={stay.firstAvailableDate}
          />
          <GuestsWindow
            setGuests={setGuests}
            guests={guests}
            isBooking={true}
          />
        </div>
        <button onClick={() => onBook()} className={styles.bookBtn}>
          Reserve
        </button>
        <div className={styles.price}>
          <h3
            className={styles.underline}
          >{`$${price} x ${diffInDays} nights`}</h3>
          <h3>${diffInDays * price}</h3>
        </div>
        <div className={styles.price}>
          <h3 className={styles.underline}>Bearbnb honey fee</h3>
          <h3>$42</h3>
        </div>
        <div className={styles.price}>
          <h1>Total</h1>
          <h1>${diffInDays * price + 42}</h1>
        </div>
      </section>

      {bookingModal && (
        <ConfirmBookingModal
          confirmModalHelper={confirmModalHelper}
          booking={booking}
        />
      )}
    </>
  );
}
