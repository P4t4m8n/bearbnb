"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { StayModel } from "@/model/stay.model";
import { useModal } from "@/hooks/useModal";
import { useUserStore } from "@/store/useUserStore";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfrimBookingModal";
import { daysBetweenDates, getEmptyBooking } from "@/service/booking-service";
import RegularBooking from "./Views/Regular/RegularBooking";
import MobileBooking from "./Views/Mobile/MobileBooking";
import { BookingModel } from "@/model/booking.model";
import { GuestsModel } from "@/model/guest.model";
import { stayToSmallStay } from "@/service/stay.service";
import { userToSmallUser } from "@/service/user.service";

interface Props {
  stay: StayModel;
}

// Helper function to get window dimensions
const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export default function Booking({ stay }: Props) {
  const { user } = useUserStore();
  // console.log("user:", user);
  const [booking, setBooking] = useState<BookingModel>(getEmptyBooking());
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const isStart = useRef(true);
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
  }, []);

  // Handle window resize events
  const handleResize = () => {
    const { width } = getWindowDimensions();
    setIsWindowSmall(width <= 850);
  };

  // Handle date click events
  const onDateClick = (date: Date) => {
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
  };

  // Handle booking confirmation
  const onBook = () => {
    if (!user) return alert("No user");

    const newBooking: BookingModel = {
      ...booking,
      user: userToSmallUser(user),
      stay: stayToSmallStay(stay),
      host: stay.host,
      price: stay.price * diffInDays,
    };
    console.log("newBooking:", newBooking);
    setBooking(newBooking);
    setBookingModal(true);
  };

  // Update guest information
  const setGuests = (guests: GuestsModel) => {
    setBooking((prevBooking) => ({ ...prevBooking, ...guests }));
  };

  // Close booking modal
  const confirmModalHelper = () => {
    setBookingModal(false);
  };

  // Calculate difference in days between check-in and check-out dates
  //TODO: Refactor to avoid ! operator
  const diffInDays =
    booking.checkIn && booking.checkOut
      ? daysBetweenDates(booking.checkIn, booking.checkOut)
      : daysBetweenDates(
          stay.firstAvailableDate![0],
          stay.firstAvailableDate![2]
        );

  return (
    <>
      {!isWindowSmall && (
        <RegularBooking
          stay={stay}
          diffInDays={diffInDays}
          booking={booking}
          onBook={onBook}
          setGuests={setGuests}
          onDateClick={onDateClick}
        />
      )}

      {bookingModal && (
        <ConfirmBookingModal
          confirmModalHelper={confirmModalHelper}
          booking={booking}
        />
      )}
    </>
  );
}
