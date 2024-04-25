import { AvatarSVG, GlobeSVG, HamburgerSVG } from "../svgs/svgs";
import styles from "./User.module.scss";

export function User() {
  return (
    <div className={styles.user}>
      <button className={styles.svgBtn}>Airbnb your home</button>
      <button className={styles.svgBtn}>
        <GlobeSVG className={styles.globe} />
      </button>
      <button className={styles.userProfile}>
        <HamburgerSVG className={styles.svg} />
        <AvatarSVG className={styles.svg} />
      </button>
    </div>
  );
}
