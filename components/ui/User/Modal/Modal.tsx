import Link from "next/link";
import { MouseEvent } from "react";
import styles from "./Model.module.scss";

interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  isUser: boolean;
}
export default function Modal({ onLogout, isUser }: Props) {
  return (
    <>
      {!isUser ? (
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
            <Link href={"/login"}>Trips</Link>
          </li>
          <li>
            <Link href={"/login"}>WIshlist</Link>
          </li>
          <li>
            <Link href={"/login"}>Mange listing</Link>
          </li>
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
