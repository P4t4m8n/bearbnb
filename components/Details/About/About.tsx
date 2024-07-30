"use client";
import { useState, useRef, useEffect } from "react";
import { PlusSVG, ScrollBySVG } from "../../svgs/svgs";
import styles from "./About.module.scss";
import { useModal } from "@/hooks/useModal";
interface Props {
  description: string;
}

export default function About({ description }: Props) {
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const modelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModal(modelRef);

  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      setShowButton(
        descriptionElement.scrollHeight > descriptionElement.clientHeight
      );
    }
  }, [description]);

  return (
    <>
      <div className={styles.about}>
        <h1>About this place</h1>
        <p ref={descriptionRef}>{description}</p>
        {showButton && (
          <button
            className={styles.openModelBtn}
            onClick={() => setIsModelOpen(true)}
          >
            <span>Show more</span>
            <ScrollBySVG />
          </button>
        )}
      </div>
      {isModelOpen && (
        <div className={styles.model} ref={modelRef}>
          <button
            className={styles.closeModelBtn}
            onClick={() => setIsModelOpen(false)}
          >
            <PlusSVG />
          </button>
          <article className={styles.modelArticle}>
            <h1>About this place</h1>
            {description}
          </article>
        </div>
      )}
    </>
  );
}
