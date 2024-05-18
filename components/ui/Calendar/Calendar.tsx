"use client";

import { useState, useMemo } from "react";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";
import { BookingModel, BookingSmallModel } from "@/model/booking.model";

interface Props {
  date: Date;
  onDateClick: (date: Date) => void;
  bookings?: BookingSmallModel[];
  isSearch?: boolean;
  onDateSearch?: (date: Date | null) => void;
  booking?: BookingModel;
}

export function Calendar({
  date,
  onDateClick,
  bookings = [],
  isSearch,
  booking,
  onDateSearch,
}: Props) {
  // State to keep track of the user selected month
  const [anchorDate, setAnchorDate] = useState<Date>(date || new Date());

  // Function to switch the current month by a given direction (1 for next, -1 for previous)
  const switchMonth = (dir: number) => {
    const newMonth = anchorDate.getMonth() + dir;
    setAnchorDate(new Date(anchorDate.getFullYear(), newMonth));
  };

  // Memoize filtered bookings to avoid unnecessary recalculations on each render
  const filteredBookings: BookingSmallModel[] = useMemo(() => {
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
        onDateClick={isSearch ? onDateSearch! : onDateClick}
        date={anchorDate}
        onMonthChange={switchMonth}
      />
    </section>
  );
}
