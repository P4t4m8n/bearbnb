import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MobileUserNav.module.scss";
import ProfileModel from "../Modal/ProfileModel";
interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  firstName?: string;
  _id?: string;
  isOwner?: boolean;
  imgUrl?: string;
}
export default function MobileUserNav({
  onLogout,
  firstName,
  _id,
  isOwner,
  imgUrl,
}: Props) {
  const [isNavVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;

      const rect = sentinel.getBoundingClientRect();
      const distanceFromTop = rect.top + window.scrollY;
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && distanceFromTop > 1100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleScroll);
    };
  }, []);

  const conClass = `${styles.mobileCon} ${
    !isNavVisible ? styles.notVisible : ""
  }`;
  return (
    <>
      <div ref={sentinelRef} className={conClass}>
        <ProfileModel
          onLogout={onLogout}
          firstName={firstName}
          _id={_id}
          isOwner={isOwner}
          imgUrl={imgUrl}
          isMobile={true}
        />
      </div>
    </>
  );
}
