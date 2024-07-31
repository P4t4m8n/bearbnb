"use client";

import { useState, useMemo } from "react";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";
import { BookingSmallModel } from "@/model/booking.model";

interface Props {
  date: Date;
  bookings: BookingSmallModel[];
  bookingDate?: {
    start: Date | null;
    end: Date | null;
  };
  onDateClick: (date: Date) => void;
  clearDates: () => void;
}

export function Calendar({
  date,
  bookings = [],
  bookingDate,
  onDateClick,
  clearDates,
}: Props) {
  // State to keep track of the user selected month
  const [anchorDate, setAnchorDate] = useState<Date>(date || new Date());

  // Function to switch the current month by a given direction (1 for next, -1 for previous)
  const switchMonth = (dir: number) => {
    const newMonth = anchorDate.getMonth() + dir;
    setAnchorDate(new Date(anchorDate.getFullYear(), newMonth));
  };

  // Memoize filtered bookings to avoid unnecessary recalculations on each render
  // const filteredBookings: BookingSmallModel[] = useMemo(() => {
  //   if (!bookings || bookings.length === 0) return [];
  //   const monthToInclude = anchorDate.getMonth();
  //   return bookings.filter(
  //     (booking) =>
  //       booking.checkIn?.getMonth() === monthToInclude ||
  //       booking.checkOut?.getMonth() === monthToInclude
  //   );
  // }, [bookings, anchorDate]);

  return (
    <section className={`${styles.calendar} ${styles.single}`}>
      <MonthGrid
        bookings={[]}
        checkIn={bookingDate?.start}
        checkOut={bookingDate?.end}
        onDateClick={onDateClick}
        date={anchorDate}
        onMonthChange={switchMonth}
      />
  
    </section>
  );
}
