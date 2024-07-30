import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import styles from "./DetailsHeader.module.scss";
import ShareButton from "@/components/Buttons/ShareButton/ShareButton";

interface Props {
  name: string;
  stayId: string;
}
export function DetailsHeader({ name, stayId }: Props) {
  return (
    <div className={styles.detailsHeader}>
      <h1>{name}</h1>
      <div className={styles.actions}>
        <ShareButton />
        <LikeButton stayId={stayId} isDetails={true} />
      </div>
    </div>
  );
}
