"use client";

import { useRef } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { Calendar } from "../Calendar/Calendar";
import { GuestsWindow } from "./GuestsModel/GuestsModel";
import { filterToSearchParams } from "@/service/filter.service";
import StaySearchMobile from "./StaySearchMobile/StaySearchMobile";
import { useFilterStore } from "@/store/userFIlterStore";
import AddressSearch from "./AddressSearch/AddressAutoComplete/AddressSearch";
import { useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "@/service/locations.service";
interface Props {
  isActive: boolean;
  setIsHeaderAsModel: (isHeaderAsModel: boolean) => void;
  isHeaderAsModel: boolean;
}
export function StaySearch({
  isActive,
  isHeaderAsModel,
  setIsHeaderAsModel,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const searchAsModelRef = useRef<HTMLDivElement | null>(null);
  const [isCalendarOpen, setIsCalenderOpen] = useModal(calendarRef, null);

  const { handleLocation, filterBy, clearDates, handleDate, handleGuests,onClear } =
    useFilterStore();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    libraries,
    id: "google-map-script",
  });

  const onSearch = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    filterToSearchParams(filterBy, params);

    const url = `/search?${params.toString()}`;
    router.push(url);
  };

  const scrollClass = `${styles.search} ${isActive ? styles.scroll : ""} ${
    isHeaderAsModel ? styles.searchAsModel : ""
  }`;

  return (
    <>
      <div ref={searchAsModelRef} className={scrollClass}>
        {isLoaded && (
          <AddressSearch
            span={"Where"}
            placeHolder={"Search destinations"}
            onSelect={handleLocation}
          />
        )}
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
      <button
        className={`${styles.searchAsModelBtn} ${
          !isActive || isHeaderAsModel ? styles.hide : ""
        }`}
        onClick={() => setIsHeaderAsModel(true)}
      >
        <span>Anywhere</span>
        <span>Any week</span>
        <h5>Add guests</h5>
        <div className={styles.svgCon}>
          <SearchSVG />
        </div>
      </button>

      <StaySearchMobile
        handleLocation={handleLocation}
        filterBy={filterBy}
        clearDates={clearDates}
        onDateClick={handleDate}
        handleGuests={handleGuests}
        onSearch={onSearch}
        onClear={onClear}
      />
    </>
  );
}
