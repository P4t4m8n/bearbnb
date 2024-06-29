"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { GuestsModel, StayModel } from "@/model/stay.model";
import { useModal } from "@/hooks/useModal";
import { useUserStore } from "@/store/useUserStore";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfrimBookingModal";
import { daysBetweenDates, getEmptyBooking } from "@/service/booking-service";
import RegularBooking from "./VIews/Regular/RegularBooking";
import MobileBooking from "./VIews/Mobile/MobileBooking";
import { BookingModel } from "@/model/booking.model";
import { stayToSmallStay } from "@/service/stay.service";

interface Props {
  price: number;
  stay: StayModel;
  onSaveBooking: (booking: BookingModel) => void;
}

// Helper function to get window dimensions
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export default function Booking({ price, stay, onSaveBooking }: Props) {
  const [booking, setBooking] = useState<BookingModel>(getEmptyBooking());
  const { user, setUser } = useUserStore();
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const isStart = useRef(true);
  const calendarModalRef = useRef<HTMLDivElement | null>(null);
  const [calenderOpen, setCalenderOpen] = useModal(calendarModalRef, null);
  const [bookingModal, setBookingModal] = useState(false);

  useEffect(() => {
    // Initialize booking dates
    setBooking({
      ...booking,
      checkIn: stay.firstAvailableDate![0],
      checkOut: stay.firstAvailableDate![2],
    });

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle window resize events
  const handleResize = useCallback(() => {
    const { width } = getWindowDimensions();
    setIsWindowSmall(width <= 650);
  }, []);

  // Handle date click events
  const onDateClick = useCallback(
    (date: Date) => {
      if (!date) return;
      if (isStart.current) {
        if (booking.checkOut && date >= booking.checkOut)
          setBooking({ ...booking, checkIn: date, checkOut: date });
        else setBooking({ ...booking, checkIn: date });
        isStart.current = false;
      } else {
        if (date < booking.checkIn)
          setBooking({ ...booking, checkIn: date, checkOut: date });
        else setBooking({ ...booking, checkOut: date });
        isStart.current = true;
      }
    },
    [booking]
  );

  // Handle booking confirmation
  const onBook = useCallback(() => {
    if (!user) return alert("No user");

    const updatedBooking: BookingModel = {
      ...booking,
      stay: stayToSmallStay(stay),
      host: stay.host,
      user: user,
      price: price,
    };

    setBooking(updatedBooking);
    setBookingModal(true);
  }, [booking, user, stay, price]);

  // Update guest information
  const setGuests = useCallback((guests: GuestsModel) => {
    setBooking((prevBooking) => ({ ...prevBooking, ...guests }));
  }, []);

  // Close booking modal
  const confirmModalHelper = useCallback(() => {
    setBookingModal(false);
  }, []);

  // Calculate difference in days between check-in and check-out dates
  //TODO: Refactor to avoid ! operator
  const diffInDays = useMemo(() => {
    return booking.checkIn && booking.checkOut
      ? daysBetweenDates(booking.checkIn, booking.checkOut)
      : daysBetweenDates(
          stay.firstAvailableDate![0],
          stay.firstAvailableDate![2]
        );
  }, [booking, stay]);

  return (
    <>
      {!isWindowSmall && (
        <RegularBooking
          stay={stay}
          diffInDays={diffInDays}
          booking={booking}
          isCalenderOpen={calenderOpen}
          setCalenderOpen={setCalenderOpen}
          onBook={onBook}
          setGuests={setGuests}
          onDateClick={onDateClick}
        />
      )}
      {isWindowSmall && (
        <MobileBooking
          onDateClick={onDateClick}
          stayBooking={stay.bookings}
          checkIn={booking.checkIn}
          checkOut={booking.checkOut}
          diffInDays={diffInDays}
          price={price}
          isCalenderOpen={calenderOpen}
          setCalenderOpen={setCalenderOpen}
          onBook={onBook}
        />
      )}
      <ConfirmBookingModal
        confirmModalHelper={confirmModalHelper}
        toOpen={bookingModal}
        booking={booking}
        saveBooking={onSaveBooking}
      />
    </>
  );
}
