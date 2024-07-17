import { GuestStayType } from "@/model/stay.model";
import styles from "./StayEditShared.module.scss";
import { DynamicSVGByName } from "@/components/svgs/svgs";

interface Props {
  guestStay: GuestStayType;
  handleStayShared: (guestStay: GuestStayType) => void;
}
export default function StayEditShared({ guestStay, handleStayShared }: Props) {
  return (
    <div className={styles.pageThree}>
      <h1>What type of place will guests have?</h1>
      <div className={styles.btns}>
        <button
          className={guestStay === "Entire place" ? styles.selected : ""}
          onClick={() => handleStayShared("Entire place")}
        >
          <div>
            <h3>An entire place</h3>
            <p>Guests have the whole place to themselves</p>
          </div>
          <DynamicSVGByName name="house" />
        </button>

        <button
          className={guestStay === "Private room" ? styles.selected : ""}
          onClick={() => handleStayShared("Private room")}
        >
          <div>
            <h3>A room</h3>
            <p>
              Guests have their own room in a home, plus access to shared spaces
            </p>
          </div>
          <DynamicSVGByName name="door" />
        </button>
        <button
          className={guestStay === "Shared room" ? styles.selected : ""}
          onClick={() => handleStayShared("Shared room")}
        >
          <div>
            <h3>A shared room</h3>
            <p>
              Guests sleep in a room or common area that may be shared with you
              or others
            </p>
          </div>
          <DynamicSVGByName name="sharedHouse" />
        </button>
      </div>
    </div>
  );
}
