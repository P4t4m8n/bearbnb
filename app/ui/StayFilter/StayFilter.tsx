"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FilterSVG, ScrollBySVG } from "../svgs/svgs";
import styles from "./StayFilter.module.scss";
import { useScroll } from "@/app/hooks/useScroll";

export default function StayFilter() {
  const elTypes = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elTypes);

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
