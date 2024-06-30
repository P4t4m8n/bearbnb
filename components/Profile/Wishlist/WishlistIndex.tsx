import { getLikesExtended } from "@/actions/like.action";
import styles from "./WishlistIndex.module.scss";
import WishlistPreview from "./WishlistPreview/WishlistPreview";

interface Props {
  userId: string;
}

export default async function WishlistIndex({ userId }: Props) {
  const likesExtended = await getLikesExtended({ userId });

  return (
    <ul className={styles.wishlistList}>
      {likesExtended!.map((likeExtended) => (
        <WishlistPreview key={likeExtended._id} likeExtended={likeExtended} />
      ))}
    </ul>
  );
}
