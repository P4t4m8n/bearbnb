"use client";
import { useEffect, useState } from "react";
import styles from "./LikeButton.module.scss";
import { LikeSVG } from "../../svgs/svgs";
import { useUserStore } from "@/store/useUserStore";
import { updateLIke } from "@/service/like.server";
import { Like } from "@/model/stay.model";

interface Props {
  stayId: string;
}

export default function LikeButton({ stayId }: Props) {
  const [liked, setLiked] = useState<Like | null>(null);
  const user = useUserStore.getState().user;

  useEffect(() => {
    onGetLike();
  });

  const onGetLike = async () => {
    if (!user || !user.likes || !user.likes.length) return;
    const idx = user.likes.findIndex((like) => like.stayId === stayId);
    if (idx < 0) return;
    setLiked(user.likes[idx]);
  };

  const onLike = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (!user) return alert("Please login to like");
    const response = await updateLIke(liked?.id, stayId, user.id);
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
