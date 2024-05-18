"use client";
import { useScroll } from "@/components/hooks/useScroll";
import { useRef } from "react";
import styles from "./IconList.module.scss";
import { ScrollBySVG } from "../../svgs/svgs";
import Image from "next/image";

export default function IconList() {
  const elTypes = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elTypes);

  return (
    <>
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
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
        <li>
          <div className={styles.imgCon}>
            <Image sizes="auto" src="/0.jpeg" alt="" fill={true}></Image>
          </div>
          <h5>National parks</h5>
        </li>
      </ul>
      <button className={styles.scrollBtn} onClick={() => onScrollBy(1)}>
        <ScrollBySVG className={styles.svg} />
      </button>
    </>
  );
}
