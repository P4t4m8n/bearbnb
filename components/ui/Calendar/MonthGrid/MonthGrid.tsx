import { ScrollBySVG } from "../../svgs/svgs";
import styles from "./MonthGrid.module.scss";

interface Props {
  date: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onDateClick: (date: Date) => void;
  onMonthChange: (dir: number) => void;
}

export default function MonthGrid({
  date,
  checkIn,
  checkOut,
  onDateClick,
  onMonthChange,
}: Props) {
  //////////////////////////////////////////////////////////////////////
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();
  const daysName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getMonthGrid = (date: Date) => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= daysInMonth; i++) {
      let style = "";
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);

      // Check if the current date is the check-in or check-out date
      const isCheckIn =
        checkIn &&
        currentDate.getMonth() === checkIn.getMonth() &&
        currentDate.getDate() === checkIn.getDate();
      const isCheckOut =
        checkOut &&
        currentDate.getMonth() === checkOut.getMonth() &&
        currentDate.getDate() === checkOut.getDate();

      // Determine if the date is between the check-in and check-out dates
      const isBetween =
        checkIn && checkOut && currentDate > checkIn && currentDate < checkOut;

      // Check if the date is in the past
      const isPast = currentDate < today;

      if (isCheckIn) style += `${styles.marked}`;
      else if (isCheckOut) style += `${styles.marked}`;
      else if (isBetween) style += `${styles.between}`;
      else if (isPast) style += `${styles.passDate}`;

      const arrDate = {
        dateObj: currentDate,
        style,
      };

      days.push(arrDate);
    }
    return days;
  };

  const dateClick = (date: Date) => {
    onDateClick(date);
  };

  const monthGrid = getMonthGrid(date);

  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const isBackVisible = date.getMonth() > new Date().getMonth();

  return (
    <section className={styles.month}>
      <div>
        <button
          style={{ opacity: isBackVisible ? 1 : 0 }}
          className={styles.monthNav}
          onClick={() => onMonthChange(-1)}
        >
          <ScrollBySVG />
        </button>
        <div>
          <p>{monthName}</p>
          <p>{year}</p>
        </div>
        <button className={styles.monthNav} onClick={() => onMonthChange(1)}>
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
    </section>
  );
}
