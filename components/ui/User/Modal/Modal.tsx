import Link from "next/link";
import { MouseEvent } from "react";
import styles from "./Model.module.scss";

interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  userId: string | undefined;
  isOwner?: boolean;
  authId?: string;
}
export default function Modal({ onLogout, userId, isOwner, authId }: Props) {
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
          <li>
            <Link href={"/"}>Messages</Link>
          </li>
          <li>
            <Link href={{ pathname: "trips/", query: userId }}>Trips</Link>
          </li>
          <li>
            <Link href={"/Wishlist"}>Wishlist</Link>
          </li>
          {isOwner && (
            <li>
              <Link href={{ pathname: "/listing", query: { userId, authId } }}>
                Mange listing
              </Link>
            </li>
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
