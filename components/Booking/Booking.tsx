"use client";

import { useEffect, useRef, useState } from "react";
import { StayModel } from "@/model/stay.model";
import { useUserStore } from "@/store/useUserStore";
import ConfirmBookingModal from "./ConfirmBookingModal/ConfrimBookingModal";
import { daysBetweenDates, getEmptyBooking } from "@/service/booking-service";
import RegularBooking from "./Views/Regular/RegularBooking";
import { BookingModel } from "@/model/booking.model";
import { GuestsModel } from "@/model/guest.model";
import { getDefaultDates, stayToSmallStay } from "@/service/stay.service";
import { userToSmallUser } from "@/service/user.service";

interface Props {
  stay: StayModel;
}

export default function Booking({ stay }: Props) {
  const { user } = useUserStore();
  const [booking, setBooking] = useState<BookingModel>(getEmptyBooking());
  const isStart = useRef(true);
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

  const onBook = () => {
    if (!user) return alert("No user");

    const price = stay.price * diffInDays;
    setBooking((prev) => ({ ...prev, price }));
    setBookingModal(true);
  };

  const setGuests = (guests: GuestsModel) => {
    setBooking((prevBooking) => ({ ...prevBooking, ...guests }));
  };

  const clearDates = () => {
    setBooking({
      ...booking,
      checkIn: stay.firstAvailableDate![0],
      checkOut: stay.firstAvailableDate![2],
    });
  };

  // Close booking modal
  const confirmModalHelper = () => {
    setBookingModal(false);
  };

  // Calculate difference in days between check-in and check-out dates
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

  const { checkIn, checkOut } = booking;
  const { formatCheckIn, formatCheckOut } = getDefaultDates(
    stay.firstAvailableDate,
    {
      checkIn,
      checkOut,
    }
  );

  const bookingComponentData = {
    price: stay.price,
    checkIn,
    checkOut,
    formatCheckIn,
    formatCheckOut,
    guests,
    bookings: stay.bookings,
    booking: booking,
    diffInDays,
  };

  return (
    <>
      <RegularBooking
        data={bookingComponentData}
        onBook={onBook}
        setGuests={setGuests}
        onDateClick={onDateClick}
        clearDates={clearDates}
      />

      {bookingModal && (
        <ConfirmBookingModal
          confirmModalHelper={confirmModalHelper}
          booking={booking}
        />
      )}
    </>
  );
}
