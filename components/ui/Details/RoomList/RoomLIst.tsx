"use client";
import { useScroll } from "@/components/hooks/useScroll";
interface Props {
  bedrooms: { beds: any[]; images: any[] }[];
}

import { DoubleBedSVG, ScrollBySVG, SingleBedSVG } from "../../svgs/svgs";
import styles from "./RoomList.module.scss";
import { useRef } from "react";
import { transformBedrooms } from "@/service/stay.service";

export default function RoomList({ bedrooms }: Props) {
  const elRooms = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elRooms);


  const formattedBedrooms = transformBedrooms(bedrooms);

  return (
    <div className={styles.rooms}>
      <h2> Where you’ll sleep</h2>

      {backVisible && (
        <button
          style={{ transform: "rotate(180deg)" }}
          className={styles.left}
          onClick={() => onScrollBy(-1)}
        >
          <ScrollBySVG className={styles.svg} />
        </button>
      )}
      <ul ref={elRooms}>
        {formattedBedrooms.map((room, idx) => (
          <li key={idx}>
            <div>
              {room.bedCounts.double && <DoubleBedSVG />}
              {room.bedCounts.single && <SingleBedSVG />}
            </div>
            <p>Bedroom</p>
            <p>{room.beds.join(",")}</p>
          </li>
        ))}
      </ul>
      {RoomList.length > 2 && (
        <button className={styles.right} onClick={() => onScrollBy(1)}>
          <ScrollBySVG className={styles.svg} />
        </button>
      )}
    </div>
  );
}
