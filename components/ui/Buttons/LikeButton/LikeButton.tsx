"use client";
import { useEffect, useState } from "react";
import styles from "./LikeButton.module.scss";
import { LikeSVG } from "../../svgs/svgs";
import { useUserStore } from "@/store/useUserStore";
import { getLike, updateLIke } from "@/service/like.server";
import { Like } from "@/model/stay.model";

interface Props {
  stayId: string;
}

export default function LikeButton({ stayId }: Props) {
  const [liked, setLiked] = useState<Like | null>(null);
  const currentUserId = useUserStore.getState().user?.id;

  useEffect(() => {
    onGetLike();
  }, []);

  const onGetLike = async () => {
    if (!currentUserId) return;
    try {
      const like = await getLike(currentUserId, stayId);
      if (like) {
        setLiked(like);
      }
    } catch (error) {
      console.error("Error getting like:", error);
    }
  };

  const onLike = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (!currentUserId) return alert("Please login to like");
    const response = await updateLIke(liked?.id, stayId, currentUserId);
    setLiked(response);
  };

  const buttonClass = `${styles.likeButton} ${
    liked ? styles.likeSvgActive : ""
  }`;

  return (
    <button className={buttonClass} onClick={onLike}>
      <LikeSVG />
    </button>
  );
}
