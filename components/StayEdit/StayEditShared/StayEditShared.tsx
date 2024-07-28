import { GuestStayType } from "@/model/stay.model";
import styles from "./StayEditShared.module.scss";
import { DynamicSVGByName } from "@/components/svgs/svgs";
import { useMemo } from "react";
import { sharedOptions } from "@/service/stay.service";

interface Props {
  guestStay: GuestStayType;
  handleStayShared: (guestStay: GuestStayType) => void;
}
export default function StayEditShared({ guestStay, handleStayShared }: Props) {
  const options = useMemo(() => sharedOptions, []);
  return (
    <div className={styles.stayEditSharedContainer}>
      <h1>What type of place will guests have?</h1>
      <ul className={styles.btns}>
        {options.map((option) => (
          <li key={option.option}>
            <button
              className={guestStay === option.option ? styles.selected : ""}
              onClick={() => handleStayShared(option.option)}
            >
              <div>
                <h3>{option.option}</h3>
                <p>Guests have the whole place to themselves</p>
              </div>
              <DynamicSVGByName name={option.svg} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
