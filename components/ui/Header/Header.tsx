"use client";
import { useEffect, useRef, useState } from "react";
import { LogoSVG } from "../svgs/svgs";
import { User } from "../User/User";
import styles from "./Header.module.scss";
import { StaySearch } from "../StaySearch/StaySearch";
import Link from "next/link";
import { UserSmall } from "@/model/stay.model";

interface Props {
  _user?: UserSmall | null;
}

export default function Header({ _user }: Props) {
  const [isActive, setIsActive] = useState(false);
  const sentinelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (sentinel) {
      const observer = new IntersectionObserver(
        (entries) => {
          setIsActive(!entries[0].isIntersecting);
        },
        {
          threshold: [1.0], 
          rootMargin: "0px 0px 0px 0px", 
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
          width: "100%",
          position: "absolute",
          top: "70px",
          opacity: 0,
        }}
      ></section>

      <section className={headerClass}>
        <Link href={"/"} className={styles.logo}>
          <LogoSVG />
          <h2>airbnb</h2>
        </Link>
        <div className={styles.placeHolder}>
          <span>Stays</span>
          <span>Experiences</span>
          <span>Online Experiences</span>
        </div>
        <User _user={_user} />
        <StaySearch isActive={isActive} />
      </section>
    </>
  );
}
