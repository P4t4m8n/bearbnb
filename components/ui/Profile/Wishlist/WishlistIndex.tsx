import { getLikesByUser, updateLikeNotes } from "@/service/like.server";
import styles from "./WishlistIndex.module.scss";
import WishlistPreview from "./WishlistPreview/WishlistPreview";

interface Props {
  userId: string;
}

export default async function WishlistIndex({ userId }: Props) {
  const likes = await getLikesByUser(userId);

  const onUpdateLikeTxt = async (likeId: string, txt: string) => {
    "use server";
    await updateLikeNotes(likeId, txt);
  };

  return (
    <ul className={styles.wishlistList}>
      {likes.map((like) => (
        <WishlistPreview
          updateLikeNote={onUpdateLikeTxt}
          key={like.id}
          likeObj={like}
        />
      ))}
    </ul>
  );
}
