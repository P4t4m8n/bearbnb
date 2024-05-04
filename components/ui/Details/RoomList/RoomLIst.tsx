"use client";
import { useScroll } from "@/components/hooks/useScroll";
interface Props {
  bedrooms: { beds: any[]; images: any[] }[];
}

import { DoubleBedSVG, ScrollBySVG, SingleBedSVG } from "../../svgs/svgs";
import styles from "./RoomList.module.scss";
import { useRef } from "react";

export default function RoomList({ bedrooms }: Props) {
  const elRooms = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elRooms);

  function transformBedrooms() {
    return bedrooms.map((bedroom) => {
      // Count the number of each type of bed
      const bedCounts = bedroom.beds.reduce((acc, bed) => {
        acc[bed] = (acc[bed] || 0) + 1;
        return acc;
      }, {});

      // Format the bed description based on the counts
      const formattedBeds = Object.keys(bedCounts).map((bedType) => {
        return `${bedCounts[bedType]} ${bedType} bed${
          bedCounts[bedType] > 1 ? "s" : ""
        }`;
      });

      // Return the transformed bedroom object
      return {
        bedCounts,
        beds: formattedBeds,
        images: bedroom.images,
      };
    });
  }
  const formattedBedrooms = transformBedrooms();

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
