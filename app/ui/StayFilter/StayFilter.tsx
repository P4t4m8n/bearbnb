"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FilterSVG, ScrollBySVG } from "../svgs/svgs";
import styles from "./StayFilter.module.scss";

export default function StayFilter() {
  const elTypes = useRef<HTMLUListElement>(null);
  const [backVisible, setBackVisible] = useState(false);

  const onScrollBy = (dir: number) => {
    if (!elTypes.current) return;

    elTypes.current.scrollBy({
      left: 100 * dir,
      behavior: "smooth",
    });

    // Delay the check to allow the scroll to complete
    setTimeout(() => {
      if (elTypes.current && elTypes.current.scrollLeft > 0) {
        setBackVisible(true);
      } else {
        setBackVisible(false);
      }
    }, 200);
  };

  return (
    <div className={styles.filter}>
      {backVisible && (
        <button
          style={{ transform: "rotate(180deg)" }}
          className={styles.scrollBtn}
          onClick={() => onScrollBy(-1)}
        >
          <ScrollBySVG className={styles.svg} />
        </button>
      )}
      <ul ref={elTypes} className={styles.types}>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
      </ul>
      <button className={styles.scrollBtn} onClick={() => onScrollBy(1)}>
        <ScrollBySVG className={styles.svg} />
      </button>
      <button className={styles.filterBtn}>
        <FilterSVG />
        <p>Filters</p>
      </button>
    </div>
  );
}
