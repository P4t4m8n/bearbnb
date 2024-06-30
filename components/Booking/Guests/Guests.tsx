import { useRef, useState } from "react";
import { MinusSVG, PlusSVG, ScrollBySVG } from "../../svgs/svgs";
import styles from "./Guests.module.scss";
import { useModal } from "@/hooks/useModal";
import { GuestsModel } from "@/model/guest.model";

interface Props {
  guests: GuestsModel;
  setGuests: (guests: GuestsModel) => void;
}
export function Guests({ guests, setGuests }: Props) {
  const [guestsState, setGuestsState] = useState(guests);
  const modalRef = useRef(null);

  const onClose = () => {
    // setGuests(guestsState);
  };
  const [open, setModal] = useModal(modalRef, onClose);

  const onClickGuests = (
    key: "adults" | "children" | "infants",
    dir: number
  ) => {
    const value = guests[key] + dir;
    setGuests({ ...guests, [key]: value });
    // setGuestsState((prevState) => ({ ...prevState, [key]: value }));
  };

  const numOfGuests = guests.adults + guests.children + guests.infants;

  return (
    <button onClick={() => setModal(true)} className={styles.guests}>
      <div className={styles.total}>
        <span>GUESTS</span>
        <p>{numOfGuests} guests</p>
      </div>
      <ScrollBySVG className={open ? styles.rotate : ""} />
      {open && (
        <ul ref={modalRef}>
          <li>
            <div>
              <h2>Adults</h2>
              <h3>Age 13+</h3>
            </div>
            <div>
              <button
                onClick={() => onClickGuests("adults", -1)}
                disabled={guests.adults <= 1}
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
            <div>
              <h2>Children</h2>
              <h3>Ages 2-12</h3>
            </div>
            <div>
              <button
                onClick={() => onClickGuests("children", -1)}
                disabled={guests.children <= 0}
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
            <div>
              <h2>Infants</h2>
              <h3>Under 2</h3>
            </div>
            <div>
              <button
                onClick={() => onClickGuests("infants", -1)}
                disabled={guests.infants <= 0}
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
    </button>
  );
}
