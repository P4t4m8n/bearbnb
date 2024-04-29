import styles from "./MonthGrid.module.scss";

interface Props {
  date: Date;
}

export default function MonthGrid({ date }: Props) {
  // const monthStart = new Date(
  //   date.getFullYear(),
  //   date.getMonth(),
  //   1
  // );
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth = monthEnd.getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const daysName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <section className={styles.month}>
      <div>
        <p>{monthName}</p>
        <p>{year}</p>
      </div>
      <ul>
        {daysName.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul>
        {days.map((day, idx) => (
          <li key={idx}>{day.getDate()}</li>
        ))}
      </ul>
    </section>
  );
}
