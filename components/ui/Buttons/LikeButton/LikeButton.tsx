"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./LikeButton.module.scss";
import { LikeSVG } from "../../svgs/svgs";
import { useUserStore } from "@/store/useUserStore";
import { updateLike } from "@/service/like.server";
import { UserSmallModel } from "@/model/user.model";

interface Props {
  stayId: string;
}

export default function LikeButton({ stayId }: Props) {
  //State for optimistic update
  const [isLiked, setIsLiked] = useState(false);
  const likeIdRef = useRef<string>("");

  const user: UserSmallModel | null = useUserStore.getState().user;

  useEffect(() => {
    onGetLike();
  });

  const onGetLike = async () => {
    if (!user || !user.likes || !user.likes.length) return;
    const idx = user.likes.findIndex((like) => like.stayId === stayId);
    if (idx < 0) return;
    likeIdRef.current = user.likes[idx].id;
    setIsLiked(true);
  };

  const onLike = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    if (!user) return alert("Please login to like");
    //Optimistic update
    setIsLiked((prev) => !prev);

    try {
      const response = await updateLike(likeIdRef.current, stayId, user.id);
      likeIdRef.current = response?.id || "";
    } catch (error) {
      console.error("error:", error);
    } finally {
      //Make sure to update the state if the like was not successful
      if (!likeIdRef.current && isLiked) setIsLiked(false);
      if (likeIdRef.current && !isLiked) setIsLiked(true);
    }
  };

  const buttonClass = `${styles.likeButton} ${
    isLiked ? styles.likeSvgActive : ""
  }`;

  return (
    <button className={buttonClass} onClick={onLike}>
      <LikeSVG />
    </button>
  );
}
