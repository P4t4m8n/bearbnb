"use client";

import Link from "next/link";
import styles from "./ProfileNav.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProfileNav() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");
  const authId = searchParams.get("authId");
  const currentPath = usePathname();

  return (
    <nav className={styles.profileNav}>
      <Link
        className={currentPath === "/trips" ? styles.active : ""}
        href={{ pathname: "trips/", query: { userId, authId } }}
      >
        Trips
      </Link>
      <Link
        className={currentPath === "/wishlist" ? styles.active : ""}
        href={{ pathname: "wishlist/", query: { userId, authId } }}
      >
        Wishlist
      </Link>
      <Link
        className={currentPath === "/listing" ? styles.active : ""}
        href={{ pathname: "/listing", query: { userId, authId } }}
      >
        bookings
      </Link>
      <Link
        className={currentPath === "/mystays" ? styles.active : ""}
        href={{ pathname: "/mystays", query: { userId, authId } }}
      >
        assets
      </Link>
    </nav>
  );
}
