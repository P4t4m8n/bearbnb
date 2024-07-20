import { StayType } from "@/model/stay.model";
import styles from "./StayEditName.module.scss";
import { ErrorSVG } from "@/components/svgs/svgs";
import { ChangeEvent } from "react";

interface Props {
  value: string;
  name: "name" | "description";
  setText: (ev: ChangeEvent) => void;
  h1: string;
  p: string;
  maxLength: number;
  rows: number;
}

export default function StayEditText({
  value,
  name,
  setText,
  h1,
  p,
  maxLength,
  rows,
}: Props) {
  return (
    <section className={styles.stayEditName}>
      <div className={styles.editNameHeader}>
        <h1>{h1}</h1>
        <p>{p}</p>
      </div>
      <div className={styles.editNameInput}>
        <textarea
          value={value}
          name={name}
          onChange={setText}
          rows={rows}
          className={`${styles.textArea} ${
            value.length > maxLength ? styles.error : ""
          }`}
          style={{ maxHeight: `${rows * 2.5}rem` }}
        ></textarea>
        <h2>{`${value.length}/${maxLength}`}</h2>
        {value.length > maxLength && (
          <div>
            <ErrorSVG />
            <h3>{`The maximum number of characters allowed is ${maxLength}`}</h3>
          </div>
        )}
      </div>
    </section>
  );
}
