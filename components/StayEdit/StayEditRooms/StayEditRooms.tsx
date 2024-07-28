import { MinusSVG, PlusSVG, TrashSVG } from "@/components/svgs/svgs";
import styles from "./StayEditRooms.module.scss";
import { BedRoomModel } from "@/model/bedroom.model";
import StayEditRoomsModel from "./StayEditRoomsModel/StayEditRoomsModel";
import { useMemo } from "react";

interface Props {
  capacity: number;
  bedRooms: BedRoomModel[];
  baths: number;
  handleRooms: (type: "capacity" | "bedRooms" | "baths", value: number) => void;
  saveBedRoom: (idx: number, bedrooms?: BedRoomModel) => void;
}
export default function StayEditRooms({
  capacity,
  bedRooms,
  baths,
  handleRooms,
  saveBedRoom,
}: Props) {
  const options: {
    header: "Guests" | "Bedrooms" | "Bathrooms";
    type: "capacity" | "bedRooms" | "baths";
    value: number;
  }[] = useMemo(
    () => [
      { header: "Guests", type: "capacity", value: capacity },
      { header: "Bedrooms", type: "bedRooms", value: bedRooms.length },
      { header: "Bathrooms", type: "baths", value: baths },
    ],
    [capacity, bedRooms, baths]
  );
  console.log("bedRooms:", bedRooms.length);
  return (
    <section className={styles.basics}>
      <div className={styles.basicsHeader}>
        <h1>Share some basics about your place</h1>
        <p>{`You'll add more details later,like bed types`}</p>
      </div>
      <ul className={styles.basicsList}>
        {options.map((option) => (
          <li className={styles.basics} key={option.type}>
            <h2>{option.header}</h2>
            <div className={styles.actions}>
              <button
                onClick={() => handleRooms(option.type, option.value - 1)}
                disabled={option.value <= 0}
                className={option.value <= 0 ? styles.disable : ""}
              >
                <MinusSVG />
              </button>
              <h4>{option.value}</h4>
              <button
                onClick={() => handleRooms(option.type, option.value + 1)}
              >
                <PlusSVG />
              </button>
            </div>
          </li>
        ))}

        <li className={styles.bedRooms}>
          <ul className={styles.bedRoomsList}>
            {bedRooms.map((bedroom, index) => (
              <li className={styles.bedRoomCon} key={index}>
                <StayEditRoomsModel
                  key={index}
                  bedRoom={bedroom}
                  saveBedRoom={saveBedRoom}
                  idx={index}
                />
                <button
                  className={styles.deleteBtn}
                  onClick={() => saveBedRoom(index)}
                >
                  <TrashSVG />
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
}
