"use client";

import Link from "next/link";
import styles from "./ProfileNav.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProfileNav() {
  const searchParams = useSearchParams();

  const _id = searchParams.get("_id");
  const currentPath = usePathname();

  return (
    <nav className={styles.profileNav}>
      <Link
        className={currentPath === "/profile/trips/" ? styles.active : ""}
        href={{ pathname: "/profile/trips/", query: { _id } }}
      >
        Trips
      </Link>
      <Link
        className={currentPath === "/profile/wishlist/" ? styles.active : ""}
        href={{ pathname: "/profile/wishlist/", query: { _id } }}
      >
        Wishlist
      </Link>
      <Link
        className={currentPath === "/profile/listing" ? styles.active : ""}
        href={{ pathname: "/profile/listing", query: { _id } }}
      >
        bookings
      </Link>
      <Link
        className={currentPath === "/profile/hosting" ? styles.active : ""}
        href={{ pathname: "/profile/hosting", query: { _id } }}
      >
        assets
      </Link>
    </nav>
  );
}
