"use client";
import { ShareSVG } from "@/components/svgs/svgs";
import { MouseEvent } from "react";
import styles from "./ShareButton.module.scss";

export default function ShareButton() {
  const handleShareClick = async (ev: MouseEvent) => {
    try {
      if (window && window.location) {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
          alert("URL copied to clipboard");
        });
      }
    } catch (error) {
      console.error("Error copying URL to clipboard", error);
    }
  };
  return (
    <button onClick={handleShareClick} className={styles.shareBtn}>
      <ShareSVG />
      <span>Share</span>
    </button>
  );
}
