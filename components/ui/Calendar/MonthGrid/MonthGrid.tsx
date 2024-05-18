import { BookingSmallModel } from "@/model/booking.model";
import { ScrollBySVG } from "../../svgs/svgs";
import styles from "./MonthGrid.module.scss";

interface Props {
  date: Date;
  onDateClick: (date: Date) => void;
  onMonthChange: (dir: number) => void;
  checkIn?: Date | null;
  checkOut?: Date | null;
  bookings?: BookingSmallModel[];
}

interface DateObj {
  dateObj: Date;
  style: string;
}

export default function MonthGrid({
  date,
  onDateClick,
  onMonthChange,
  checkIn,
  checkOut,
  bookings,
}: Props) {
  // Get the last date of the current month
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  const daysName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Function to generate the month grid with appropriate styles
  const getMonthGrid = (date: Date): DateObj[] => {
    const days: DateObj[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Helper functions for date styles
    const isSameDay = (date1: Date, date2: Date) =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    const isBetween = (current: Date, start: Date, end: Date) =>
      current > start && current < end;

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      let style = "";

      // Determine styles based on date conditions
      if (checkIn && isSameDay(currentDate, checkIn)) style = styles.marked;
      else if (checkOut && isSameDay(currentDate, checkOut))
        style = styles.marked;
      else if (checkIn && checkOut && isBetween(currentDate, checkIn, checkOut))
        style = styles.between;
      else if (currentDate < today) style = styles.passDate;

      days.push({ dateObj: currentDate, style });
    }

    // Mark booked dates
    bookings?.forEach((booking) => {
      const startIdx = booking.checkIn!.getDate() - 1;
      const endIdx = booking.checkOut!.getDate() - 1;
      for (let i = startIdx; i <= endIdx; i++) {
        days[i].style = styles.passDate;
      }
    });

    return days;
  };

  const dateClick = (date: Date) => {
    if (!date) return;
    onDateClick(date);
  };

  const monthGrid = getMonthGrid(date);
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  //To move back in months only if possible
  const isBackVisible = date.getMonth() > new Date().getMonth();

  return (
    <section className={styles.month}>
      <div>
        <button
          style={{ opacity: isBackVisible ? 1 : 0 }}
          className={styles.monthNav}
          onClick={() => onMonthChange(-1)}
          aria-label="Previous Month"
        >
          <ScrollBySVG />
        </button>
        <div>
          <p>{monthName}</p>
          <p>{year}</p>
        </div>
        <button
          className={styles.monthNav}
          onClick={() => onMonthChange(1)}
          aria-label="Next Month"
        >
          <ScrollBySVG />
        </button>
      </div>
      <ul>
        {daysName.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul>
        {monthGrid.map((day, idx) => (
          <li
            className={day.style}
            onClick={() => dateClick(day.dateObj)}
            key={idx}
          >
            {day.dateObj.getDate()}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          //ToDO: Clear the dates and return to default dates
        }}
      >
        Clear
      </button>
    </section>
  );
}
