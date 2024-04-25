import { useEffect, useRef, useState } from "react";
import { LogoSVG } from "../svgs/svgs";
import { User } from "../User/User";
import StaySearch from "../stay-search";
import styles from "./StayFilter.module.scss";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      requestAnimationFrame(() => {
        if (currentScroll > 10 && lastScrollTop.current <= 10) {
          setIsActive(true);
        } else if (currentScroll <= 10 && lastScrollTop.current > 10) {
          setIsActive(false);
        }
        lastScrollTop.current = currentScroll;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = `${styles.header} ${isActive ? styles.scroll : ""}`;
  return (
    <section className={headerClass}>
      <div className={styles.logo}>
        <LogoSVG />
        <h2>airbnb</h2>
      </div>
      <div className={styles.placeHolder}>
        <span>Stays</span>
        <span>Experiences</span>
        <span>Online Experiences</span>
      </div>
      <User />
      <StaySearch />
    </section>
  );
}
