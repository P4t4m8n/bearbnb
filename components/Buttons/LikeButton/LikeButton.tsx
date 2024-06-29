"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./LikeButton.module.scss";
import { LikeSVG } from "../../svgs/svgs";
import { useUserStore } from "@/store/useUserStore";
import { UserModel } from "@/model/user.model";
import { saveLike } from "@/actions/like.action";

interface Props {
  stayId: string;
}

export default function LikeButton({ stayId }: Props) {
  const [isLiked, setIsLiked] = useState(false); //State for optimistic update
  const likeIdRef = useRef<string>("");

  const user: UserModel | null = useUserStore.getState().user;

  useEffect(() => {
    onGetLike();
  }, []);

  const onGetLike = async () => {
    if (!user || !user.likes || !user.likes.length) return;
    const idx = user.likes.findIndex((like) => like.stayId === stayId);
    if (idx < 0) return;
    likeIdRef.current = user.likes[idx]._id;
    setIsLiked(true);
  };

  const onLike = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    if (!user) return alert("Please login to like");
    //Optimistic update
    setIsLiked((prev) => !prev);

    try {
      const response = await saveLike(
        likeIdRef.current,
        user._id as string,
        stayId as string
      );
      likeIdRef.current = response || "";
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
