"use client";

import { useRef, useState } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getEmptyFilter } from "@/service/stay.service";
import { useModal } from "@/hooks/useModal";
import { Calendar } from "../Calendar/Calendar";
import AddressSearch from "./AddressSearch/AddressAutoComplete/AddressSearch";
import { GuestsModel } from "@/model/guest.model";
import { GuestsWindow } from "./GuestsModel/GuestsModel";
interface Props {
  isActive: boolean;
}
export function StaySearch({ isActive }: Props) {
  const scrollClass = `${styles.search} ${isActive ? styles.scroll : ""}`;
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const [filterBy, setFilterBy] = useState(getEmptyFilter());
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [isCalendarOpen, setIsCalenderOpen] = useModal(calendarRef, null);
  const isStart = useRef<boolean>(true);

  const handleDate = (date: Date | null) => {
    let dates: {
      start: Date | null;
      end: Date | null;
    } = {
      start: filterBy.dates?.start || null,
      end: filterBy.dates?.end || null,
    };

    if (!date) {
      dates = { start: null, end: null };
    } else {
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
    setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
  };

  const onSearch = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    console.log(filterBy);

    if (!filterBy.location) {
      alert("Please select a location");
      return;
    }

    if (!filterBy.dates || !filterBy.dates.start || !filterBy.dates.end) {
      alert("Please select dates");
      return;
    }

    if (!filterBy.guests || !filterBy.guests.adults) {
      alert("Please select guests");
      return;
    }
    params.set("location", `${filterBy.location.lat},${filterBy.location.lon}`);
    params.set(
      "startDate",
      filterBy.dates.start?.toISOString().substring(0, 10) || ""
    );
    params.set(
      "endDate",
      filterBy.dates.end?.toISOString().substring(0, 10) || ""
    );
    params.set("guests", JSON.stringify(filterBy.guests));

    const url = `/search?${params.toString()}`;
    router.push(url);
  };

  const handleLocation = ({ lat, lon }: { lat: number; lon: number }) => {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      location: { lat, lon },
    }));
    setIsCalenderOpen(true);
  };

  const handleGuests = (guests: GuestsModel) => {
    setFilterBy((prevFilter) => ({ ...prevFilter, guests }));
  };

  return (
    <div className={scrollClass}>
      <AddressSearch handleLocation={handleLocation} />
      <div
        onClick={() => setIsCalenderOpen(true)}
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
        {isCalendarOpen && (
          <section className={styles.calendarCon}>
            <Calendar
              isSearch={true}
              bookingDate={filterBy.dates}
              onDateClick={handleDate}
              date={new Date()}
            />
          </section>
        )}
      </div>
      <GuestsWindow guests={filterBy.guests!} setGuests={handleGuests} />
      <button onClick={onSearch} className={styles.searchBtn}>
        <SearchSVG />
      </button>
    </div>
  );
}
