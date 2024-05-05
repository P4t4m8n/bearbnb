import { ChangeEvent, useRef, useState } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/service/util";
import { getEmptyFilter } from "@/service/stay.service";
import { useModal } from "@/components/hooks/useModal";
import { Calendar } from "../Calendar/Calendar";

interface Props {
  isActive: boolean;
}
export function StaySearch({ isActive }: Props) {
  const scrollClass = `${styles.search} ${isActive ? styles.scroll : ""}`;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [filterBy, setFilterBy] = useState(getEmptyFilter());
  const calendarRef = useRef<HTMLButtonElement | null>(null);
  const [open, setModal] = useModal(calendarRef, null);
  const isStart = useRef<boolean>(true);
  const params = new URLSearchParams(searchParams);

  const handleSearch = (ev: ChangeEvent | Event) => {
    // if (term) {
    //   params.set("query", term);
    // } else {
    //   params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleDate = (date: Date) => {
    if (isStart.current) {
      params.set("startDate", date.toISOString().substring(0, 10));
      if (filterBy.dates.end && date >= filterBy.dates.end) {
        const dates = { start: date, end: null };
        setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
      } else {
        const dates = { ...filterBy.dates, end: date };
        setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
      }
      isStart.current = false;
    } else {
      params.set("endDate", date.toISOString().substring(0, 10));

      const dates = { ...filterBy.dates, end: date };
      setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
      isStart.current = true;
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={scrollClass}>
      <div className={`${styles.input} ${styles.btn}`}>
        <span>Where</span>
        <input
          placeholder="Search destinations"
          value=""
          onChange={handleSearch}
        />
      </div>
      <button
        onClick={() => setModal(true)}
        ref={calendarRef}
        className={`${styles.dates} ${styles.input}`}
      >
        <div>
          <span>Check in</span>
          <p>Add dates</p>
        </div>
        <div>
          <span>Check out</span>
          <p>Check out</p>
        </div>
        {open && (
          <Calendar
            isSearch={true}
            onDateSearch={handleDate}
            date={new Date()}
          />
        )}
      </button>
      <button className={`${styles.input} ${styles.btn}`}>
        <span>Who</span>
        <p>Who</p>
      </button>
      <button className={styles.searchBtn}>
        <SearchSVG />
      </button>
    </div>
  );
}
