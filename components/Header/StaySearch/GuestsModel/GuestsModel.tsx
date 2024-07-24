import { MouseEvent, useRef } from "react";
import { MinusSVG, PlusSVG } from "../../../svgs/svgs";
import styles from "./GuestsModel.module.scss";
import { useModal } from "@/hooks/useModal";
import { GuestsModel } from "@/model/guest.model";

interface Props {
  guests: GuestsModel;
  setGuests: (guests: GuestsModel) => void;
  isBooking?: boolean;
}
export function GuestsWindow({ guests, setGuests, isBooking = false }: Props) {
  const modalRef = useRef<HTMLUListElement>(null);
  const [isGuestsSearchOpen, setIsGuestsSearchOpen] = useModal(modalRef);

  const onClickGuests = (
    key: "adults" | "children" | "infants",
    dir: number
  ) => {
    const value = guests[key] + dir;
    const updatedGuests = { ...guests, [key]: value };
    setGuests(updatedGuests);
  };

  const onSetGuests = (ev: MouseEvent) => {
    setIsGuestsSearchOpen(true);
  };

  const numOfGuests = guests.adults + guests.children + guests.infants;

  return (
    <div className={`${styles.guestsSearch} ${!isBooking ? styles.hover : ""}`}>
      <button onClick={onSetGuests} className={styles.total}>
        <span>GUESTS</span>
        {numOfGuests ? <p>{numOfGuests} guests</p> : <p>Add guests</p>}
      </button>
      {isGuestsSearchOpen && (
        <ul
          ref={modalRef}
          className={
            isBooking ? styles.guestsBookingModel : styles.guestsSearchModel
          }
        >
          <li>
            <div className={styles.type}>
              <h2>Adults</h2>
              <h3>Age 13+</h3>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => onClickGuests("adults", -1)}
                disabled={guests.adults <= 1}
                style={{ opacity: guests.adults <= 1 ? 0.5 : 1 }}
              >
                <MinusSVG />
              </button>
              <h4>{guests.adults}</h4>
              <button onClick={() => onClickGuests("adults", 1)}>
                <PlusSVG />
              </button>
            </div>
          </li>
          <li>
            <div className={styles.type}>
              <h2>Children</h2>
              <h3>Ages 2-12</h3>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => onClickGuests("children", -1)}
                disabled={guests.children <= 0}
                style={{ opacity: guests.children <= 0 ? 0.5 : 1 }}
              >
                <MinusSVG />
              </button>
              <h4>{guests.children}</h4>
              <button onClick={() => onClickGuests("children", 1)}>
                <PlusSVG />
              </button>
            </div>
          </li>
          <li>
            <div className={styles.type}>
              <h2>Infants</h2>
              <h3>Under 2</h3>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => onClickGuests("infants", -1)}
                disabled={guests.infants <= 0}
                style={{ opacity: guests.infants <= 0 ? 0.5 : 1 }}
              >
                <MinusSVG />
              </button>
              <h4>{guests.infants}</h4>
              <button onClick={() => onClickGuests("infants", 1)}>
                <PlusSVG />
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
