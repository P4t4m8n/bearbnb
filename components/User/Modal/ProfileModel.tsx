import Link from "next/link";
import { MouseEvent } from "react";
import styles from "./Model.module.scss";
import { UserModel } from "@/model/user.model";

interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  user: UserModel | null;
}
export default function ProfileModel({ user, onLogout }: Props) {
  const id = user?._id.toString();

  return (
    <>
      {!user ? (
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
          <li>Hello {user.firstName}</li>
          <li>
            <Link href={"/"}>Messages</Link>
          </li>
          <li>
            <Link href={{ pathname: "/trips/", query: { id } }}>Trips</Link>
          </li>
          <li>
            <Link href={{ pathname: "/wishlist/", query: { id } }}>
              Wishlist
            </Link>
          </li>
          {user.isOwner && (
            <>
              <li>
                <Link href={{ pathname: "/listing", query: { id } }}>
                  Mange bookings
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/myStays", query: { id } }}>
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
