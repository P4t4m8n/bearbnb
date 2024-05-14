"use client";
import { useEffect, useState } from "react";
import styles from "./LikeButton.module.scss";
import { LikeSVG } from "../../svgs/svgs";
import { useUserStore } from "@/store/useUserStore";
import { updateLike } from "@/service/like.server";
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

    try {
      const response = await updateLike(liked?.id, stayId, user.id);
      setLiked(response);
    } catch (error) {
      console.error("error:", error);
    }
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
