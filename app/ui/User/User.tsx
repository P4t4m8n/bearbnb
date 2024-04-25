import { AvatarSVG, GlobeSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./StayFilter.module.scss";

export function User() {
  return (
    <div className={styles.user}>
      <button className={styles.svgBtn}>Airbnb your home</button>
      <button className={styles.svgBtn}>
        <GlobeSVG />
      </button>
      <button className={styles.userProfile}>
        <HamburgerSVG />
        <AvatarSVG />
      </button>
    </div>
  );
}
