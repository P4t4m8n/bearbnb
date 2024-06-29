import React from "react";
import styles from "./StayListSkeleton.module.scss";
import StayPreviewSkeleton from "../StayPreviewSkeleton/StayPreviewSkeleton";

export default function StayListSkeleton() {
  const skeletonCount = 8;

  return (
    <ul className={styles.skeleton}>
      {Array.from({ length: skeletonCount }, (_, index) => (
        <StayPreviewSkeleton key={index} />
      ))}
    </ul>
  );
}
