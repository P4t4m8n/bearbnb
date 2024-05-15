import { LikeSVG, ShareSVG } from "../../svgs/svgs";
import styles from "./DetailsHeader.module.scss";

interface Props {
  name: string;
}
export function DetailsHeader({ name }: Props) {
  return (
    <header className={styles.header}>
      <h1>{name}</h1>
      <div>
        <button>
          <ShareSVG />
          <span>Share</span>
        </button>
        <button>
          <LikeSVG />
          <span>Save</span>
        </button>
      </div>
    </header>
  );
}
