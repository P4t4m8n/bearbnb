import { useRef, useState } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getEmptyFilter } from "@/service/stay.service";
import { useModal } from "@/hooks/useModal";
import { Calendar } from "../Calendar/Calendar";
import AddressSearch from "./AdressSearch/AdressAutoComplete/AddressSearch";
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

  const handleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setFilterBy((prevFilter) => ({ ...prevFilter, name: value }));
  };

  const handleDate = (date: Date | null) => {
    let dates: {
      start: Date | null;
      end: Date | null;
    } = {
      start: filterBy.dates?.start || null,
      end: filterBy.dates?.end || null,
    };

    if (!date) {
      // If null is provided, reset both start and end dates and URL parameters
      dates = { start: null, end: null };
      params.delete("startDate");
      params.delete("endDate");
      replace(`${pathname}?${params.toString()}`);
    } else {
      // Handle date selection based on whether it's a start date or an end date
      if (isStart.current) {
        // Setting start date and potentially clearing end date if it's before the new start
        dates.start = date;
        if (dates.end && date >= dates.end) {
          dates.end = null;
        }
        isStart.current = false;
      } else {
        // Setting end date and potentially correcting start date if it's after the new end
        if (dates.start && date <= dates.start) {
          dates = { start: date, end: null };
        } else {
          dates.end = date;
        }
        isStart.current = true;
      }
    }
    // Update the filter state
    // setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
  };

  const onSearch = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the default form submission behavior
    ev.preventDefault();

    // Set the 'endDate' URL parameter if the end date is provided
    if (filterBy.dates!.end) {
      params.set("endDate", filterBy.dates!.end.toISOString().substring(0, 10));
    }

    // Set the 'startDate' URL parameter if the start date is provided
    if (filterBy.dates!.start) {
      params.set(
        "startDate",
        filterBy.dates!.start.toISOString().substring(0, 10)
      );
    }

    // Set the 'name' URL parameter, defaulting to an empty string if not provided
    params.set("name", filterBy.name || "");

    // Set the 'start' URL parameter for price range, defaulting to "1" if not provided
    if (filterBy.priceRange!.start) {
      params.set("startPrice", filterBy.priceRange!.start.toString());
    } else {
      params.set("startPrice", "1");
    }

    // Set the 'end' URL parameter for price range, defaulting to a high value if not provided
    if (filterBy.priceRange!.end) {
      params.set("endPrice", filterBy.priceRange!.end.toString());
    } else {
      params.set("endPrice", "9999999999");
    }

    // Update the URL with the new parameters
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={scrollClass}>
      <AddressSearch />
      <button
        onClick={() => setModal(true)}
        ref={calendarRef}
        className={`${styles.dates} ${styles.input}`}
      >
        <div>
          <span>Check in</span>
          <p>{filterBy.dates!.start?.toLocaleDateString() || "Add dates"}</p>
        </div>
        <div>
          <span>Check out</span>
          <p>{filterBy.dates!.end?.toLocaleDateString() || "Check out"}</p>
        </div>
        {open && (
          <section className={styles.calendarCon}>
            <Calendar
              isSearch={true}
              onDateClick={handleDate}
              date={new Date()}
            />
          </section>
        )}
      </button>
      <button className={`${styles.input} ${styles.btn}`}>
        <span>Who</span>
        <p>Who</p>
      </button>
      <button onClick={onSearch} className={styles.searchBtn}>
        <SearchSVG />
      </button>
    </div>
  );
}
