import { FilterByModel } from "@/model/filters.model";
import styles from "./StaySearchMobile.module.scss";
import { SearchSVG } from "@/components/svgs/svgs";
import { fixedDatesForMobile } from "@/service/stay.service";
import { useModal } from "@/hooks/useModal";
import { useRef, useState } from "react";
import AddressSearch from "../AddressSearch/AddressAutoComplete/AddressSearch";
import { Calendar } from "@/components/Calendar/Calendar";
import { Guests } from "@/components/Booking/Guests/Guests";
import { GuestsModel } from "@/model/guest.model";

interface Props {
  filterBy: FilterByModel;
  handleLocation: ({ lat, lng }: { lat: number; lng: number }) => void;
  onDateClick: (date: Date) => void;
  clearDates: () => void;
  handleGuests: (guests: GuestsModel) => void;
}

export default function StaySearchMobile({
  filterBy,
  handleLocation,
  onDateClick,
  clearDates,
  handleGuests,
}: Props) {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isModelOpen, setIsModelOpen] = useModal(modelRef);
  console.log("isModelOpen:", isModelOpen);
  const [partInFocus, setPartInFocus] = useState<string>("where");

  const closeCalendarModel = (close: boolean) => {
    console.log("closeCalendarModel called with:", close);
    if (!close) {
      console.log("closeCalendarModel executing state update");
      setPartInFocus("where");
    }
  };

  const fixedDates = fixedDatesForMobile(filterBy.dates);
  const totalGuests =
    (filterBy.guests?.adults || 0) +
    (filterBy.guests?.children || 0) +
    (filterBy.guests?.infants || 0);
  console.log("partInFocus before render:", partInFocus);

  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className={styles.searchModelBtn}
      >
        <SearchSVG />
        <div className={styles.searchInfo}>
          <h3>
            {filterBy.location?.city ? filterBy.location.city : `Where to?`}
          </h3>
          <div>
            {!filterBy.location?.city && <span>Anywhere</span>}
            <span>{fixedDates ? fixedDates : "Any week"}</span>
            <span>{totalGuests > 0 ? totalGuests : "Add guests"}</span>
          </div>
        </div>
      </button>

      {isModelOpen && (
        <section className={styles.searchModelMobile} ref={modelRef}>
          <button
            onClick={() => setIsModelOpen(false)}
            className={styles.closeModelBtn}
          >
            X
          </button>

          <section className={styles.where}>
            <div
              className={`${styles.whereFocus} ${
                partInFocus === "where" ? styles.visible : styles.hidden
              }`}
            >
              <h1>Where to?</h1>
              <AddressSearch handleLocation={handleLocation} />
            </div>

            <button
              onClick={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();

                setPartInFocus("where");
              }}
              className={`${styles.notFocus} ${
                partInFocus === "where" ? styles.hidden : styles.visible
              }`}
            >
              <p>Where</p>
              <h4>{`I'm flexible`}</h4>
            </button>
          </section>

          <section className={styles.when}>
            <div
              className={`${styles.whenFocus} ${
                partInFocus === "when" ? styles.visible : styles.hidden
              }`}
            >
              <h1>{`When's your trip?`}</h1>
              <div>
                <Calendar
                  date={new Date()}
                  bookings={[]}
                  bookingDate={filterBy.dates}
                  clearDates={clearDates}
                  onDateClick={onDateClick}
                  closeCalendarModel={closeCalendarModel}
                />
              </div>
            </div>

            <button
              onClick={() => setPartInFocus("when")}
              className={`${styles.notFocus} ${
                partInFocus === "when" ? styles.hidden : styles.visible
              }`}
            >
              <p>When</p>
              <h4>{`Add dates`}</h4>
            </button>
          </section>

          <section className={styles.who}>
            {partInFocus === "who" ? (
              <Guests setGuests={handleGuests} guests={filterBy.guests!} />
            ) : (
              <button
                onClick={() => setPartInFocus("who")}
                className={styles.notFocus}
              >
                <p>Who</p>
                <h4>Add guests</h4>
              </button>
            )}
          </section>
        </section>
      )}
    </>
  );
}
