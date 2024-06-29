import { AvatarSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useRef } from "react";
import { clientSupabase } from "@/util/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import Modal from "./Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { logout } from "@/actions/auth.action";

export function User() {
  const { user, setUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [open, setModal] = useModal(modalRef, null);

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    logout();
  };

  return (
    <div className={styles.user}>
      <button className={styles.svgBtn + styles.placeHolder}>
        Airbnb your home
      </button>

      <button onClick={() => setModal(true)} className={styles.userProfile}>
        {user ? (
          <>
            <HamburgerSVG className={styles.svg} />
            {user.imgUrl ? (
              <AvatarSVG className={styles.svg} />
            ) : (
              // <Image src={user.imgUrl} width={32} height={32} alt=""></Image>
              <AvatarSVG className={styles.svg} />
            )}
          </>
        ) : (
          <>
            <HamburgerSVG className={styles.svg} />
            <AvatarSVG className={styles.svg} />
          </>
        )}
      </button>
      {open && (
        <div ref={modalRef} className={styles.modalCon}>
          <Modal
            userName={user?.firstName}
            authId={user?.authId}
            isOwner={user?.isOwner}
            onLogout={onLogout}
            userId={user?.id}
          />
        </div>
      )}
    </div>
  );
}
