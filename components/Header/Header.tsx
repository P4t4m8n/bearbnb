"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { LogoSVG } from "../svgs/svgs";
import { User } from "../User/User";
import styles from "./Header.module.scss";
import { StaySearch } from "../StaySearch/StaySearch";
import Link from "next/link";
import { throttle } from "@/util/throttle";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const sentinelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (sentinel) {
      const observer = new IntersectionObserver(
        throttle((entries) => {
          setIsActive(!entries[0].isIntersecting);
        }, 100),
        {
          threshold: [0.1],
          rootMargin: "-1px 0px 0px 0px",
        }
      );

      observer.observe(sentinel);

      return () => {
        observer.unobserve(sentinel);
        observer.disconnect();
      };
    }
  }, []);

  const headerClass = `${styles.header} ${isActive ? styles.scroll : ""}`;

  return (
    <>
      <section
        ref={sentinelRef}
        className={styles.sentinel}
        style={{
          height: "32px",
          width: "50vw",
          position: "absolute",
          top: "1px",
          opacity: 0,
        }}
      ></section>

      <section className={headerClass}>
        <Link href={"/"} className={styles.logo}>
          <LogoSVG />
          <h2>bearbnb</h2>
        </Link>
        <div className={styles.placeHolder}>
          <span>Stays</span>
          <span>Experiences</span>
        </div>
        <User />
        <Suspense fallback={<div>Loading...</div>}>
          <StaySearch isActive={isActive} />
        </Suspense>
      </section>
    </>
  );
}
