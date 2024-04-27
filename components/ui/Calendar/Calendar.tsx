"use client";

import { useEffect, useRef, useState } from "react";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import MonthGrid from "./MonthGrid/MonthGrid";
import styles from "./Calendar.module.scss";

interface Props {
  date: Date;
}

enum DisplayType {
  SINGLE,
  DOUBLE,
}
export function Calendar({ date }: Props) {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.SINGLE
  );

  //   useEffect(() => {
  //     setMonths([
  //       currentDate,
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 2),
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 3),
  //     ]);
  //   }, [currentDate]);

  //   if (!months || months.length <= 0) return <div>Loading</div>;

  const elCalendar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => {
      if (
        elCalendar.current?.offsetWidth &&
        elCalendar.current?.offsetWidth > 700
      ) {
      }
    };
  });

  let calendarDisplayType = `${styles.calendar}`;
  switch (displayType) {
    case DisplayType.DOUBLE:
      calendarDisplayType += ` ${styles.double}`;
      break;
    default:
      calendarDisplayType += ` ${styles.single}`;
      break;
  }

  return (
    <>
      {displayType === DisplayType.SINGLE && (
        <section ref={elCalendar} className={calendarDisplayType}>
          <MonthGrid date={date} />
        </section>
      )}
      {displayType === DisplayType.DOUBLE && (
        <section ref={elCalendar} className={styles.calendar}>
          <MonthGrid date={date} />
          <MonthGrid date={new Date(date.getFullYear(), date.getMonth() + 1)} />
        </section>
      )}
    </>
  );
}
