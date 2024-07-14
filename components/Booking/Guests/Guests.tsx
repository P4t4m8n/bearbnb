import { MinusSVG, PlusSVG } from "../../svgs/svgs";
import { GuestsModel } from "@/model/guest.model";
import styles from "./Guests.module.scss";
interface Props {
  guests: GuestsModel;
  setGuests: (guests: GuestsModel) => void;
}

export function Guests({ guests, setGuests }: Props) {
  const onClickGuests = (
    key: "adults" | "children" | "infants",
    dir: number
  ) => {
    const value = guests[key] + dir;
    setGuests({ ...guests, [key]: value });
  };

  return (
    <ul className={styles.guestsFilter}>
      <h1>{`Who's coming?`}</h1>
      <li>
        <div>
          <h2>Adults</h2>
          <h3>ages 13 or above</h3>
        </div>
        <div className={styles.guestsActions}>
          <button
            onClick={() => onClickGuests("adults", -1)}
            disabled={guests.adults < 1}
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
        <div className={styles.guestsActions}>
          <button
            onClick={() => onClickGuests("children", -1)}
            disabled={guests.children < 1}
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
        <div className={styles.guestsActions}>
          <button
            onClick={() => onClickGuests("infants", -1)}
            disabled={guests.infants < 1}
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
  );
}
