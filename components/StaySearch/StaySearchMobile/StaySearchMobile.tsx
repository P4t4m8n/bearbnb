import { FilterByModel } from "@/model/filters.model";
import styles from "./StaySearchMobile.module.scss";
import { SearchSVG } from "@/components/svgs/svgs";
import { fixedDatesForMobile } from "@/service/stay.service";
import { useModal } from "@/hooks/useModal";
import { useRef, useState } from "react";
import { Calendar } from "@/components/Calendar/Calendar";
import { Guests } from "@/components/Booking/Guests/Guests";
import { GuestsModel } from "@/model/guest.model";
import { LocationModel } from "@/model/location.model";
import AddressSearch from "../AddressSearch/AddressAutoComplete/AddressSearch";

interface Props {
  filterBy: FilterByModel;
  handleLocation: (location: LocationModel) => void;

  onDateClick: (date: Date) => void;
  clearDates: () => void;
  handleGuests: (guests: GuestsModel) => void;
  onSearch: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StaySearchMobile({
  filterBy,
  handleLocation,
  onDateClick,
  clearDates,
  handleGuests,
  onSearch,
}: Props) {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isModelOpen, setIsModelOpen] = useModal(modelRef);
  const [partInFocus, setPartInFocus] = useState<string>("where");

  const closeCalendarModel = (close: boolean) => {
    if (!close) {
      setPartInFocus("who");
    }
  };

  const fixedDates = fixedDatesForMobile(filterBy.dates);
  const totalGuests =
    (filterBy.guests?.adults || 0) +
    (filterBy.guests?.children || 0) +
    (filterBy.guests?.infants || 0);

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
              <AddressSearch onSelect={handleLocation} />
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
            <div
              className={`${styles.whoFocus} ${
                partInFocus === "who" ? styles.visible : styles.hidden
              }`}
            >
              <Guests setGuests={handleGuests} guests={filterBy.guests!} />
            </div>

            <button
              onClick={() => setPartInFocus("who")}
              className={`${styles.notFocus} ${
                partInFocus === "who" ? styles.hidden : styles.visible
              }`}
            >
              <p>Who</p>
              <h4>Add guests</h4>
            </button>
          </section>
        </section>
      )}
    </>
  );
}
