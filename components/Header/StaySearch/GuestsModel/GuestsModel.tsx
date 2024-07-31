import { useRef } from "react";
import { MinusSVG, PlusSVG, ScrollBySVG } from "../../../svgs/svgs";
import styles from "./GuestsModel.module.scss";
import { useModal } from "@/hooks/useModal";
import { GuestsKey, GuestsModel } from "@/model/guest.model";

interface Props {
  guests: GuestsModel;
  setGuests: (guests: GuestsModel) => void;
  isBooking?: boolean;
}
export function GuestsWindow({ guests, setGuests, isBooking = false }: Props) {
  const modalRef = useRef<HTMLUListElement>(null);
  const [isGuestsSearchOpen, setIsGuestsSearchOpen] = useModal(modalRef);

  const onClickGuests = (key: GuestsKey, dir: number) => {
    const value = guests[key] + dir;
    if (value >= 0) {
      const updatedGuests = { ...guests, [key]: value };
      setGuests(updatedGuests);
    }
  };

  const { adults, children, infants } = guests;
  const numOfGuests = guests.adults + guests.children + guests.infants;

  const options: {
    key: GuestsKey;
    title: string;
    age: string;
    value: number;
  }[] = [
    { key: "adults", title: "Adults", age: "Age 13+", value: adults },
    { key: "children", title: "Children", age: "Ages 2-12", value: children },
    { key: "infants", title: "Infants", age: "Under 2", value: infants },
  ];

  return (
    <div className={`${styles.guestsSearch} ${!isBooking ? styles.hover : styles.booking}`}>
      <button
        onClick={() => setIsGuestsSearchOpen(true)}
        className={styles.total}
      >
        <div className={styles.text}>
          <span>GUESTS</span>
          {numOfGuests ? <p>{numOfGuests} guests</p> : <p>Add guests</p>}
        </div>
        {isBooking && (
          <div
            className={`${styles.svgCon} ${
              isGuestsSearchOpen ? styles.rotate : ""
            }`}
          >
            <ScrollBySVG />
          </div>
        )}
      </button>
      {isGuestsSearchOpen && (
        <ul
          ref={modalRef}
          className={
            isBooking ? styles.guestsBookingModel : styles.guestsSearchModel
          }
        >
          {options.map((option) => (
            <li key={option.key}>
              <div className={styles.type}>
                <h2>{option.title}</h2>
                <h3>{option.age}</h3>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => onClickGuests(option.key, -1)}
                  disabled={option.value <= 0}
                  style={{ opacity: option.value <= 0 ? 0.5 : 1 }}
                  aria-label={`Decrease ${option.title}`}
                >
                  <MinusSVG />
                </button>
                <h4>{option.value}</h4>
                <button
                  aria-label={`Increase ${option.title}`}
                  onClick={() => onClickGuests(option.key, 1)}
                >
                  <PlusSVG />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
