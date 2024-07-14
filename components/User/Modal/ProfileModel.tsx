import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./Model.module.scss";
import { UserModel } from "@/model/user.model";
import {
  AvatarSVG,
  LikeSVG,
  LogoSVG,
  LogoutSVG,
  MessageSVG,
  SearchSVG,
} from "@/components/svgs/svgs";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  onLogout: (ev: MouseEvent<HTMLButtonElement>) => void;
  firstName?: string;
  _id?: string;
  isOwner?: boolean;
  isMobile?: boolean;
  imgUrl?: string;
}
export default function ProfileModel({
  onLogout,
  firstName,
  _id,
  isOwner,
  isMobile = false,
  imgUrl,
}: Props) {
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState("/");
  console.log("pathname:", pathname);
  useEffect(() => {
    setIsFocused(pathname);
  }, [pathname]);
  return (
    <>
      {isMobile ? (
        <ul className={styles.modalUserMobile}>
          {!_id ? (
            <>
              <li className={isFocused === "/login" ? styles.focused : ""}>
                <Link href={{ pathname: "/login", query: "login" }}>
                  <AvatarSVG className={styles.svg} />
                  <span>Log in</span>
                </Link>
              </li>

              <li
                className={
                  isFocused === "/profile/wishlist/" ? styles.focused : ""
                }
              >
                <Link href={`/profile/wishlist/`}>
                  <LikeSVG />
                  <span>Wishlist</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className={styles.logoutBtn}>
                  <LogoutSVG />
                  <button onClick={onLogout}>Logout</button>
                </div>
              </li>
              <li className={isFocused === "/profile" ? styles.focused : ""}>
                <Link href={{ pathname: "/profile", query: { _id } }}>
                  {imgUrl ? (
                    <Image src={imgUrl} width={24} height={24} alt=""></Image>
                  ) : (
                    <AvatarSVG className={styles.svg} />
                  )}
                  <span>Hello {firstName}</span>
                </Link>
              </li>

              <li
                className={
                  isFocused === "/profile/messages/" ? styles.focused : ""
                }
              >
                <Link href={{ pathname: "/profile/messages", query: { _id } }}>
                  <MessageSVG />
                  <span>Messages</span>
                </Link>
              </li>

              <li
                className={
                  isFocused === "/profile/trips/" ? styles.focused : ""
                }
              >
                <Link href={{ pathname: "/profile/trips/", query: { _id } }}>
                  <LogoSVG />
                  <span>Trips</span>
                </Link>
              </li>
              <li
                className={
                  isFocused === "/profile/wishlist/" ? styles.focused : ""
                }
              >
                <Link href={{ pathname: "/profile/wishlist/", query: { _id } }}>
                  <LikeSVG />
                  <span>Wishlist</span>
                </Link>
              </li>
            </>
          )}
          <li className={isFocused === "/" ? styles.focused : ""}>
            <Link href={"/"}>
              <SearchSVG />
              <span>Explore</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={styles.modalUser}>
          {!_id ? (
            <>
              <li>
                <Link href={{ pathname: "/login", query: "login" }}>
                  Log in
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/signup", query: "login" }}>
                  Sign up
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/stay/edit/0", query: { _id } }}>
                  Airbnb your home
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={{ pathname: "/profile", query: { _id } }}>
                  {firstName}
                </Link>
              </li>

              <li>
                <Link href={{ pathname: "/profile/messages", query: { _id } }}>
                  Messages
                </Link>
              </li>

              <li>
                <Link href={{ pathname: "/profile/trips/", query: { _id } }}>
                  Trips
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/profile/wishlist/", query: { _id } }}>
                  Wishlist
                </Link>
              </li>
              {isOwner && (
                <>
                  <li>
                    <Link
                      href={{ pathname: "/profile/listing", query: { _id } }}
                    >
                      Mange bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={{ pathname: "/profile/myStays", query: { _id } }}
                    >
                      Mange assets
                    </Link>
                  </li>
                </>
              )}

              <li>
                <button style={{ width: "100%" }} onClick={onLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}
