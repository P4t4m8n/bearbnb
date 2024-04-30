import { AvatarSVG, GlobeSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientSupabase } from "@/util/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import { Session } from "@supabase/supabase-js";
import Modal from "./Modal/Modal";
import { useModal } from "@/components/hooks/useModal";

export function User() {
  const { user, setUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [open, setModal] = useModal(modalRef);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await clientSupabase.auth.getSession();
      if (data.session) console.log("_user!!!!!!!!:", data.session.user);
    };

    loadUser();
  }, []);

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    try {
      const { error } = await clientSupabase.auth.signOut();
      if (error) throw new Error(error.message);
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

      <button onClick={() => setModal(true)} className={styles.userProfile}>
        {user ? (
          <>
            <HamburgerSVG className={styles.svg} />
            {user.imgUrl ? (
              <Image src={user.imgUrl} width={32} height={32} alt=""></Image>
            ) : (
              <AvatarSVG className={styles.svg} />
            )}
          </>
        ) : (
          <>
            <HamburgerSVG className={styles.svg} />
            <AvatarSVG className={styles.svg} />
          </>
        )}

        {open && (
          <div ref={modalRef} className={styles.modalCon}>
            <Modal onLogout={onLogout} isUser={!!user} />
          </div>
        )}
      </button>
    </div>
  );
}
