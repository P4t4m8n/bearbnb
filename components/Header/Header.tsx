"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { LogoSVG } from "../svgs/svgs";
import { User } from "../User/User";
import styles from "./Header.module.scss";
import { StaySearch } from "./StaySearch/StaySearch";
import Link from "next/link";
import { throttle } from "@/util/throttle";
import { AmenitySmallModel } from "@/model/amenity.model";
import { usePathname } from "next/navigation";
import StayFilter from "./StayFilter/StayFilter";
import { useModal } from "@/hooks/useModal";

interface Props {
  amenities: AmenitySmallModel[];
}

export default function Header({ amenities }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [isSmallHeader, setIsSmallHeader] = useState(false);
  const headerModelRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderAsModel, setIsHeaderAsModel] = useModal(headerModelRef);
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (pathname.includes("search")) {
      setIsSmallHeader(true);
    } else {
      setIsSmallHeader(false);
    }
  }, [pathname]);

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

  const headerClass = `${styles.header} ${
    isActive || isSmallHeader ? styles.scroll : ""
  } ${isHeaderAsModel ? styles.headerAsModel : ""}`;

  return (
    <>
      <section ref={sentinelRef} className={styles.sentinel}></section>

      <header ref={headerModelRef} className={headerClass}>
        <Link href={"/"} className={styles.logo}>
          <LogoSVG />
          <h2>airbnb</h2>
        </Link>

        <User />
        <Suspense fallback={<div>Loading...</div>}>
          <StaySearch
            setIsHeaderAsModel={setIsHeaderAsModel}
            isHeaderAsModel={isHeaderAsModel}
            isActive={isActive || isSmallHeader}
          />
        </Suspense>
        {!isHeaderAsModel && (
          <StayFilter
            amenities={amenities}
            isActive={isActive || isSmallHeader}
          />
        )}
      </header>
    </>
  );
}
