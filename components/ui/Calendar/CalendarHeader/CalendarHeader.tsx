// interface Props {
//   currentDate: Date;
//   setCurrentDate: (date: Date) => void;
// }

export default function CalendarHeader() {
  //   const prevMonth = () => {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
  //     );
  //   };

  //   const nextMonth = () => {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
  //     );
  //   };

  const daysName = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="calendar-head">
      <ul className="days">
        {daysName.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    </div>
  );
}
