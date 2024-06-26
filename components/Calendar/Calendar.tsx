"use client";

import { useState, useMemo } from "react";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";
import { BookingModel } from "@/model/booking.model";

interface Props {
  date: Date;
  onDateClick: (date: Date) => void;
  bookings?: BookingModel[];
  isSearch?: boolean;
  booking?: BookingModel;
}

export function Calendar({
  date,
  onDateClick,
  bookings = [],
  isSearch,
  booking,
}: Props) {
  // State to keep track of the user selected month
  const [anchorDate, setAnchorDate] = useState<Date>(date || new Date());

  // Function to switch the current month by a given direction (1 for next, -1 for previous)
  const switchMonth = (dir: number) => {
    const newMonth = anchorDate.getMonth() + dir;
    setAnchorDate(new Date(anchorDate.getFullYear(), newMonth));
  };

  // Memoize filtered bookings to avoid unnecessary recalculations on each render
  const filteredBookings: BookingModel[] = useMemo(() => {
    if (!bookings || bookings.length === 0) return [];
    const monthToInclude = anchorDate.getMonth();
    return bookings.filter(
      (booking) =>
        booking.checkIn?.getMonth() === monthToInclude ||
        booking.checkOut?.getMonth() === monthToInclude
    );
  }, [bookings, anchorDate]);

  return (
    <section className={`${styles.calendar} ${styles.single}`}>
      <MonthGrid
        bookings={filteredBookings}
        checkIn={booking?.checkIn}
        checkOut={booking?.checkOut}
        onDateClick={onDateClick}
        date={anchorDate}
        onMonthChange={switchMonth}
      />
    </section>
  );
}
