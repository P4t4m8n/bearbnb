import { AvatarSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, use, useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import ProfileModel from "./Modal/ProfileModel";
import { useModal } from "@/hooks/useModal";
import { getSessionUser, logout } from "@/actions/auth.action";
import { set } from "zod";

export function User() {
  const { user, setUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [open, setModal] = useModal(modalRef, null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const _user = await getSessionUser();
    setUser(_user);
  };

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    logout();
    setUser(null);
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
          <ProfileModel user={user} onLogout={onLogout} />
        </div>
      )}
    </div>
  );
}
