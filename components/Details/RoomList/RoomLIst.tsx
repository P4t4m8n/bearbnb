"use client";
import { useScroll } from "@/hooks/useScroll";
import { DynamicBedsSVG, ScrollBySVG } from "../../svgs/svgs";
import styles from "./RoomList.module.scss";
import { useRef } from "react";
import { transformBedrooms } from "@/service/stay.service";
import { BedRoomModel } from "@/model/bedroom.model";
import Image from "next/image";

interface Props {
  bedrooms: BedRoomModel[];
}
export default function RoomList({ bedrooms }: Props) {
  const elRooms = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elRooms);

  const formattedBedrooms = transformBedrooms(bedrooms);

  return (
    <div className={styles.rooms}>
      <h2> Where you’ll sleep</h2>

      {backVisible && (
        <button className={styles.left} onClick={() => onScrollBy(-1)}>
          <ScrollBySVG />
        </button>
      )}
      <ul className={styles.bedroomList} ref={elRooms}>
        {formattedBedrooms.map((room, idx) => (
          <li
            className={` ${room.image ? styles.bedroomImg : styles.bedroom}`}
            key={idx}
          >
            {room.image && (
              <div className={styles.imgCon}>
                <Image src={room.image} alt="room" fill={true} sizes="auto" />
              </div>
            )}
            {!room.image && (
              <ul className={styles.iconList}>
                {room.icons.map((icon) => (
                  <li className={styles.iconCon} key={icon}>
                    <DynamicBedsSVG name={icon} />
                  </li>
                ))}
              </ul>
            )}
            <h3>{`Bedroom ${idx + 1}`}</h3>
            <p>{room.description}</p>
          </li>
        ))}
      </ul>
      {bedrooms.length > 2 && (
        <button className={styles.right} onClick={() => onScrollBy(1)}>
          <ScrollBySVG />
        </button>
      )}
    </div>
  );
}
