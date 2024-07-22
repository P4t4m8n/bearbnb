import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import { LikeSVG, ShareSVG } from "../../svgs/svgs";
import styles from "./DetailsHeader.module.scss";

interface Props {
  name: string;
  stayId: string;
}
export function DetailsHeader({ name, stayId }: Props) {
  return (
    <div className={styles.detailsHeader}>
      <h1>{name}</h1>
      <div>
        <button>
          <ShareSVG />
          <span>Share</span>
        </button>
        <LikeButton stayId={stayId} />
      </div>
    </div>
  );
}
