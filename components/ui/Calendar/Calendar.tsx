"use client";

import { useRef, useState } from "react";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";
import { useBookingStore } from "@/store/useBookingStore";
import { BookingModalSmall } from "@/model/stay.model";

interface Props {
  date: Date;
  bookings?: BookingModalSmall[];
  isSearch?: boolean;
  onDateSearch?: (date: Date | null) => void;
}

export function Calendar({
  date,
  bookings = [],
  isSearch,
  onDateSearch,
}: Props) {
  const [anchorDate, setAnchorDate] = useState<Date>(date || new Date());
  const { booking, setBooking } = useBookingStore();
  const elCalendar = useRef<HTMLDivElement>(null);
  const isStart = useRef<boolean>(true);

  const onBookDateClick = (date: Date | null) => {
    if (!date) return;
    if (isStart.current) {
      if (booking.checkOut && date >= booking.checkOut)
        setBooking({ ...booking, checkIn: date, checkOut: null });
      else setBooking({ ...booking, checkIn: date });
      isStart.current = false;
    } else {
      setBooking({ ...booking, checkOut: date });
      isStart.current = true;
    }
  };

  const switchMonth = (dir: number) => {
    const newMonth = anchorDate.getMonth() + dir;
    setAnchorDate(new Date(anchorDate.getFullYear(), newMonth));
  };

  let filteredBookings: BookingModalSmall[] = [];
  if (bookings && bookings.length > 0) {
    const monthToInclude = anchorDate.getMonth();
    filteredBookings = bookings.filter(
      (booking) =>
        booking.checkIn.getMonth() === monthToInclude ||
        booking.checkOut.getMonth() === monthToInclude
    );
  }
  return (
    <>
      {!isSearch && (
        <section
          ref={elCalendar}
          className={`${styles.calendar} ${styles.single}`}
        >
          <MonthGrid
            bookings={filteredBookings}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            onDateClick={onBookDateClick}
            date={anchorDate}
            onMonthChange={switchMonth}
          />
        </section>
      )}

      {isSearch && onDateSearch && (
        <section
          ref={elCalendar}
          className={`${styles.calendar} ${styles.single}`}
        >
          <MonthGrid
            bookings={filteredBookings}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            onDateClick={onDateSearch}
            date={anchorDate}
            onMonthChange={switchMonth}
          />
        </section>
      )}
    </>
  );
}
