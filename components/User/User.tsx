import { AvatarSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import ProfileModel from "./Modal/ProfileModel";
import { useModal } from "@/hooks/useModal";
import { getSessionUser, logout } from "@/actions/auth.action";
import Image from "next/image";
import MobileUserNav from "./MobileUserNav/MobileUserNav";
import Link from "next/link";



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
      {!user?.isOwner && (
        <Link href={{ pathname: "/stay/edit" }} className={styles.hostingLink}>
          Airbnb your home
        </Link>
      )}
      {user?.isOwner && (
        <Link
          href={{ pathname: "/profile/hosting", query: { _id: user._id } }}
          className={styles.hostingLink}
        >
          Switch to hosting
        </Link>
      )}

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
            _id={user?._id}
            isOwner={user?.isOwner}
            onLogout={onLogout}
          />
        </div>
      )}
      <MobileUserNav
        firstName={user?.firstName}
        _id={user?._id}
        isOwner={user?.isOwner}
        onLogout={onLogout}
        imgUrl={user?.imgUrl}
      />
    </div>
  );
}
