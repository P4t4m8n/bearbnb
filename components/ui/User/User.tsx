import { AvatarSVG, GlobeSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientSupabase } from "@/util/supabase/client";
import { useUserStore } from "@/store/useUserStore";

export function User() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUserStore();
  console.log("user:", user);

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    await clientSupabase.auth.signOut();
  };

  return (
    <div className={styles.user}>
      <button className={styles.svgBtn}>Airbnb your home</button>
      <button className={styles.svgBtn}>
        <GlobeSVG className={styles.globe} />
      </button>
      {user && (
        <button onClick={() => setOpen(!open)} className={styles.userProfile}>
          <HamburgerSVG className={styles.svg} />
          {user.imgUrl ? (
            <Image src={user.imgUrl} width={32} height={32} alt=""></Image>
          ) : (
            <AvatarSVG className={styles.svg} />
          )}
        </button>
      )}
      {!user && (
        <button onClick={() => setOpen(!open)} className={styles.userProfile}>
          <HamburgerSVG className={styles.svg} />
          <AvatarSVG className={styles.svg} />
        </button>
      )}

      {open && (
        <ul>
          <Link href={"/login?showDialog=y"}> Login</Link>
          <button onClick={onLogout}>Logout</button>
          <li></li>
        </ul>
      )}
    </div>
  );
}
