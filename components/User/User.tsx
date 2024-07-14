import { AvatarSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import ProfileModel from "./Modal/ProfileModel";
import { useModal } from "@/hooks/useModal";
import { getSessionUser, logout } from "@/actions/auth.action";
import Image from "next/image";
import MobileUserNav from "./MobileUserNav/MobileUserNav";

interface Props {
  isActive: boolean;
}

export function User({ isActive }: Props) {
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
  let userId = user?._id;

  if (userId && typeof userId !== "string") {
    userId = userId.toString();
  }
  return (
    <div className={`${styles.user} ${isActive ? styles.scroll : ""}`}>
      <button className={styles.svgBtn}>Airbnb your home</button>

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
      </button>
      {open && (
        <div ref={modalRef} className={styles.modalCon}>
          <ProfileModel
            firstName={user?.firstName}
            _id={userId}
            isOwner={user?.isOwner}
            onLogout={onLogout}
          />
        </div>
      )}
      <MobileUserNav
        firstName={user?.firstName}
        _id={userId}
        isOwner={user?.isOwner}
        onLogout={onLogout}
        imgUrl={user?.imgUrl}
      />
    </div>
  );
}
