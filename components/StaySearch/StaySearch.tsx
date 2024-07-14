"use client";

import { useRef } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { Calendar } from "../Calendar/Calendar";
import AddressSearch from "./AddressSearch/AddressAutoComplete/AddressSearch";
import { GuestsWindow } from "./GuestsModel/GuestsModel";
import { filterToSearchParams } from "@/service/filter.service";
import StaySearchMobile from "./StaySearchMobile/StaySearchMobile";
import { useFilterStore } from "@/store/userFIlterStore";
interface Props {
  isActive: boolean;
}
export function StaySearch({ isActive }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [isCalendarOpen, setIsCalenderOpen] = useModal(calendarRef, null);

  const { handleLocation, filterBy, clearDates, handleDate, handleGuests } =
    useFilterStore();

  const onSearch = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

   

    filterToSearchParams(filterBy, params);

    const url = `/search?${params.toString()}`;
    router.push(url);
  };

  const scrollClass = `${styles.search} ${isActive ? styles.scroll : ""}`;

  return (
    <>
      <div className={scrollClass}>
        <AddressSearch handleLocation={handleLocation} />
        <div
          onClick={() => setIsCalenderOpen(true)}
          ref={calendarRef}
          className={`${styles.dates} ${styles.input}`}
        >
          <div className={styles.dateViews}>
            <span>Check in</span>
            <p>{filterBy.dates!.start?.toLocaleDateString() || "Check in"}</p>
          </div>
          <div className={styles.dateViews}>
            <span>Check out</span>
            <p>{filterBy.dates!.end?.toLocaleDateString() || "Check out"}</p>
          </div>
          {isCalendarOpen && (
            <section className={styles.calendarCon}>
              <Calendar
                date={new Date()}
                bookings={[]}
                bookingDate={filterBy.dates}
                clearDates={clearDates}
                closeCalendarModel={setIsCalenderOpen}
                onDateClick={handleDate}
              />
              <div className={styles.actions}>
                <button
                  className={styles.closeBtn}
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    setIsCalenderOpen(false);
                  }}
                >
                  Apply
                </button>

                <button className={styles.clearBtn} onClick={clearDates}>
                  Clear
                </button>
              </div>
            </section>
          )}
        </div>
        <GuestsWindow guests={filterBy.guests!} setGuests={handleGuests} />
        <button onClick={onSearch} className={styles.searchBtn}>
          <SearchSVG />
        </button>
      </div>

      <StaySearchMobile
        handleLocation={handleLocation}
        filterBy={filterBy}
        clearDates={clearDates}
        onDateClick={handleDate}
        handleGuests={handleGuests}
        onSearch={onSearch}
      />
    </>
  );
}
