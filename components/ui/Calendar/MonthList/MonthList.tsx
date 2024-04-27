import MonthGrid from "../MonthGrid/MonthGrid";

interface Props {
  months: Date[];
}
export default function MonthList({ months }: Props) {
  return (
    <ul className="months">
      {months.map((date, idx) => (
        <MonthGrid key={idx} date={date} />
      ))}
    </ul>
  );
}
