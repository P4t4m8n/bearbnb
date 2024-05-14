"use client";

import { BookingModel,  Stay } from "@/model/stay.model";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/hooks/useModal";
import { useUserStore } from "@/store/useUserStore";
import { stayToSmallStay } from "@/service/util";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfrimBookingModal";
import { daysBetweenDates } from "@/service/booking-service";
import RegularBooking from "./VIews/Reguler/RegularBooking";
import MobileBooking from "./VIews/Mobile/MobileBooking";

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
  });

  const handleResize = () => {
    const { width } = getWindowDimensions();
    if (width <= 650) {
      setIsWindowSmall(true);
      return;
    }
    if (isWindowSmall) setIsWindowSmall(false);
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

 

  return (
    <>
      {!isWindowSmall && (
        <RegularBooking
          stay={stay}
          diffInDays={diffInDays}
          booking={booking}
          isCalenderOpen={calenderOpen}
          setCalenderOpen={setCalenderOpen}
          setBooking={setBooking}
          onBook={onBook}
        />
      )}
      {isWindowSmall && (
        <MobileBooking
          stayBooking={stay.booking}
          checkIn={booking.checkIn!}
          checkOut={booking.checkOut!}
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
        saveBooking={onSaveBooking}
      />
    </>
  );
}
