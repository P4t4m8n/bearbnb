"use client";
import { useScroll } from "@/components/hooks/useScroll";
// interface Props{
//     rooms:
// }

import { DoubleBedSVG, ScrollBySVG } from "../../svgs/svgs";
import styles from "./RoomList.module.scss";
import { useRef } from "react";

export default function RoomList() {
  const elRooms = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elRooms);

  const numberOfLis = 3;
  const liWidth = 12.5; // in rem
  const gap = 1; // in rem
  const totalWidthInRem = numberOfLis * liWidth + gap * (numberOfLis - 1);
  const ulStyle = { maxWidth: `${totalWidthInRem}rem` };

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
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
        <li>
          <DoubleBedSVG />
          <p>Bedroom</p>
          <p>1 double bed</p>
        </li>
      </ul>
      <button className={styles.right} onClick={() => onScrollBy(1)}>
        <ScrollBySVG className={styles.svg} />
      </button>
    </div>
  );
}
