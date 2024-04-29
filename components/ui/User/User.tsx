import { AvatarSVG, GlobeSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientSupabase } from "@/util/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import { Session } from "@supabase/supabase-js";

export function User() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUserStore();
  console.log("user:", user);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await clientSupabase.auth.getSession();
      if (data.session) console.log("_user!!!!!!!!:", data.session.user);
    };

    loadUser();
  }, []);

 

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    console.log("ev:", ev);
    ev.preventDefault();
    try {
      const test = await clientSupabase.auth.signOut();
      console.log("error:", test);
      // if (error) throw new Error(error.message);
    } catch (error) {
      console.error("error:", error);
    }
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
