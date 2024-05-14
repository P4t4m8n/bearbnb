import { AvatarSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";
import { MouseEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { clientSupabase } from "@/util/supabase/client";
import { useUserStore } from "@/store/useUserStore";
import Modal from "./Modal/Modal";
import { useModal } from "@/components/hooks/useModal";
import { UserSmall } from "@/model/stay.model";

interface Props {
  _user: UserSmall | null | undefined;
}

export function User({ _user }: Props) {
  const { user, setUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [open, setModal] = useModal(modalRef, null);

  useEffect(() => {
    const loadUser = async () => {
      if (_user) setUser({ ..._user });
    };

    loadUser();
  }, [_user, setUser]);

  const onLogout = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    try {
      const { error } = await clientSupabase.auth.signOut();
      if (error) throw new Error(error.message);
      setUser(null);
    } catch (error) {
      console.error("error:", error);
    }
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
            <Modal
              authId={user?.authId}
              isOwner={user?.isOwner}
              onLogout={onLogout}
              userId={user?.id}
            />
          </div>
        )}
      </button>
    </div>
  );
}
