"use client";
import { useEffect, useRef, useState } from "react";
import { LogoSVG } from "../svgs/svgs";
import { User } from "../User/User";
import styles from "./Header.module.scss";
import { StaySearch } from "../StaySearch/StaySearch";
import Link from "next/link";
import { throttle } from "@/util/throttle";
import { UserSmall } from "@/model/stay.model";

interface Props {
  _user: UserSmall | null;
}

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      requestAnimationFrame(() => {
        if (currentScroll > 100 && lastScrollTop.current <= 100) {
          setIsActive(true);
        } else if (currentScroll <= 100 && lastScrollTop.current > 100) {
          setIsActive(false);
        }
        lastScrollTop.current = currentScroll;
      });
    };

    const throttledHandleScroll = throttle(handleScroll, 50);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const headerClass = `${styles.header} ${isActive ? styles.scroll : ""}`;
  return (
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
      <User />
      <StaySearch isActive={isActive} />
    </section>
  );
}
