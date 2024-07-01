"use client";
import { useState, useRef, useEffect } from "react";
import { ScrollBySVG } from "../../svgs/svgs";
import styles from "./About.module.scss";
interface Props {
  description: string;
}

export default function About({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const descriptionElement = descriptionRef.current;
    if (descriptionElement) {
      setShowButton(
        descriptionElement.scrollHeight > descriptionElement.clientHeight
      );
    }
  }, [description]);
  return (
    <div  className={`${styles.about}  ${isExpanded ? styles.expanded : ""}`}>
      <h1>About this place</h1>
      <p ref={descriptionRef} className={` ${isExpanded ? styles.expanded : ""}`}>
        {description}
      </p>
      {showButton && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <span>{isExpanded ? "Show less" : "Show more"}</span>
          <ScrollBySVG />
        </button>
      )}
    </div>
  );
}
