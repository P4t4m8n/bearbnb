import Link from "next/link";
import { MouseEvent } from "react";
import styles from "./Model.module.scss";

interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  userId: string | undefined;
  isOwner?: boolean;
  authId?: string;
  closeModal: () => void;
}
export default function Modal({
  onLogout,
  userId,
  isOwner,
  authId,
  closeModal,
}: Props) {
  return (
    <>
      {!userId ? (
        <ul className={styles.modalNoUser}>
          <li>
            <Link href={{ pathname: "/login", query: "login" }}>Log in</Link>
          </li>
          <li>
            <Link href={{ pathname: "/login", query: "signup" }}>Sign up</Link>
          </li>
          <li>
            <Link href={"/"}>Air Bnb your home</Link>
          </li>
          <li>
            <Link href={"/"}>Help center</Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.modalUser}>
          <li onClick={closeModal}>xxxx</li>
          <li>
            <Link href={"/"}>Messages</Link>
          </li>
          <li onClick={closeModal}>
            <Link href={{ pathname: "trips/", query: { userId, authId } }}>
              Trips
            </Link>
          </li>
          <li>
            <Link href={{ pathname: "wishlist/", query: { userId, authId } }}>
              Wishlist
            </Link>
          </li>
          {isOwner && (
            <>
              <li>
                <Link
                  href={{ pathname: "/listing", query: { userId, authId } }}
                >
                  Mange bookings
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: "/myStays", query: { userId, authId } }}
                >
                  Mange assets
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href={"/login"}>Account</Link>
          </li>

          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        </ul>
      )}
    </>
  );
}
