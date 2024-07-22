"use client";
import { useScroll } from "@/hooks/useScroll";
import { useRef } from "react";
import styles from "./IconList.module.scss";
import { ScrollBySVG } from "../../svgs/svgs";
import Image from "next/image";
import { createPresentableObjects, filenames } from "@/util/createLabels";
import { LabelsType } from "@/model/labels.type";

interface Props {
  handleLabelClick: (label: LabelsType) => void;
}

export default function IconList({ handleLabelClick }: Props) {
  const elTypes = useRef<HTMLUListElement>(null);
  const [backVisible, onScrollBy] = useScroll(elTypes);
  const fileNames = filenames;
  const labels = createPresentableObjects(fileNames);

  return (
    <div className={styles.iconList}>
      {backVisible && (
        <button
          style={{ transform: "rotate(180deg)" }}
          className={styles.scrollBtn}
          onClick={() => onScrollBy(-1)}
        >
          <ScrollBySVG className={styles.svg} />
        </button>
      )}
      <ul ref={elTypes} className={styles.types}>
        {labels.map((label, idx) => (
          <li onClick={() => handleLabelClick(label.filename)} key={idx}>
            <div className={styles.imgCon}>
              <Image
                sizes="auto"
                src={`/labelsJpgs/${label.filename}.jpg`}
                alt=""
                fill={true}
              ></Image>
            </div>
            <h5>{label.PresentableTxt}</h5>
          </li>
        ))}
      </ul>
      <button className={styles.scrollBtn} onClick={() => onScrollBy(1)}>
        <ScrollBySVG className={styles.svg} />
      </button>
    </div>
  );
}
