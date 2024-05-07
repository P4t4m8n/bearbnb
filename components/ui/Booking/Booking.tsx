"use client";

import { BookingModel, GuestsModel, Stay } from "@/model/stay.model";
import { useBookingStore } from "@/store/useBookingStore";
import styles from "./Booking.module.scss";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import { useModal } from "@/components/hooks/useModal";

import { Guests } from "./Guests/Guests";
import { useUserStore } from "@/store/useUserStore";
import { stayToSmallStay } from "@/service/util";
import { useRouter } from "next/navigation";
import { getDefaultDates } from "@/service/stay.service";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfrimBookingModal";

interface Props {
  price: number;
  stay: Stay;
  onSaveBooking: (booking: BookingModel) => void;
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default function Booking({ price, stay, onSaveBooking }: Props) {
  const { booking, setBooking } = useBookingStore();
  const { user, setUser } = useUserStore();
  const [isWindowSmall, setIsWindowSmall] = useState(false);

  const calendarModalRef = useRef<HTMLDivElement | null>(null);
  const [calenderOpen, setCalenderOpen] = useModal(calendarModalRef, null);
  const [bookingModal, setBookingModal] = useState(false);

  const test = useRef(false);

  useEffect(() => {
    if (!booking.checkIn) {
      setBooking({
        ...booking,
        checkIn: stay.firstAvailableDate![0],
        checkOut: stay.firstAvailableDate![2],
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const { width } = getWindowDimensions();
    if (width <= 650) {
      setIsWindowSmall(true);
      return;
    }
    if (isWindowSmall) setIsWindowSmall(false);
  };

  const daysBetweenDates = (date1: Date, date2: Date) => {
    if (!date1 || !date2) return 0;
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = Math.abs(date2.getTime() - date1.getTime());
    const diffInDays = Math.ceil(diffInTime / oneDay);

    return diffInDays;
  };

  const setGuests = (guests: GuestsModel) => {
    const tempBooking = { ...booking, ...guests };
    setBooking(tempBooking);
  };

  const onBook = () => {
    const _stay = stayToSmallStay(stay);
    const _host = stay.host;
    const _user = user;
    if (!_user) return alert("no user");

    const updatedBooking = {
      ...booking,
      stay: _stay,
      host: _host,
      user: _user,
      price: price,
    };
    test.current = true;
    setBooking(updatedBooking);
    setBookingModal(true);
  };

  const confirmModalHelper = () => {
    setBookingModal(false);
  };

  const diffInDays =
    booking.checkIn && booking.checkOut
      ? daysBetweenDates(booking.checkIn, booking.checkOut)
      : daysBetweenDates(
          stay.firstAvailableDate![0],
          stay.firstAvailableDate![2]
        );

  const guests = {
    adults: booking.adults,
    children: booking.children,
    infants: booking.infants,
    pets: booking.pets,
  };

  const { formatCheckIn, formatCheckOut } = getDefaultDates(stay, booking);

  const monthName =
    booking.checkIn?.toLocaleString("default", { month: "long" }) || "";

  return (
    <>
      {!isWindowSmall && (
        <section className={styles.booking}>
          <header>
            <h1>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h1>
            <h3>night</h3>
          </header>
          <div className={styles.bookingInfo}>
            <button
              onClick={() => setCalenderOpen(true)}
              className={styles.dates}
            >
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
            {calenderOpen && (
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
      )}
      {isWindowSmall && (
        <section className={styles.bookingSmall}>
          <div
            className={styles.smallDates}
            onClick={() => setCalenderOpen(true)}
          >
            <div>
              <h2>{diffInDays < 0 ? "Add dates for prices" : `$${price}`}</h2>
              <h2>night</h2>
            </div>
            <h2>{`${monthName} ${booking.checkIn?.getDay()} - ${booking.checkOut?.getDay()}`}</h2>
          </div>
          <button onClick={() => onBook()} className={styles.bookBtn}>
            Reserve
          </button>
        </section>
      )}
      <ConfirmBookingModal
        confirmModalHelper={confirmModalHelper}
        toOpen={bookingModal}
        saveBooking={onSaveBooking}
      />
    </>
  );
}
