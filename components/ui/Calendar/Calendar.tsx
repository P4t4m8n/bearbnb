"use client";

import { useRef, useState } from "react";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";
import { useBookingStore } from "@/store/useBookingStore";

interface Props {
  date: Date;
}

export function Calendar({ date }: Props) {
  const [anchorDate, setAnchorDate] = useState<Date>(date || new Date());
  const { booking, setBooking } = useBookingStore();
  const elCalendar = useRef<HTMLDivElement>(null);
  const isStart = useRef<boolean>(true);

  const onDateClick = (date: Date) => {
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
    const currentDate = new Date();
    const newMonth = anchorDate.getMonth() + dir;

    setAnchorDate(new Date(anchorDate.getFullYear(), newMonth));

  };

  return (
    <section ref={elCalendar} className={`${styles.calendar} ${styles.single}`}>
      <MonthGrid
        checkIn={booking.checkIn}
        checkOut={booking.checkOut}
        onDateClick={onDateClick}
        date={anchorDate}
        onMonthChange={switchMonth}
      />
    </section>
  );
}
