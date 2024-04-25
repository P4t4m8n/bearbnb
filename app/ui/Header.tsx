import StaySearch from "./stay-search";
import AvatarSVG from "./svgs/avatar";
import GlobeSVG from "./svgs/globe";
import HamburgerSVG from "./svgs/hamburger";
import LogoSVG from "./svgs/logo";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <section className={styles.header}>
      <LogoSVG />
      <StaySearch />
      <div>
        <GlobeSVG />
        <button>
          <HamburgerSVG />
          <AvatarSVG />
        </button>
      </div>
    </section>
  );
}
