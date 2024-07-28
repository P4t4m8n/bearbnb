import Image from "next/image";
import styles from "./TransitionPage.module.scss";

interface Props {
  heading1: string;
  heading2: string;
  heading3: string;
}

export default function TransitionPage({
  heading1,
  heading2,
  heading3,
}: Props) {
  return (
    <div className={styles.transitionPageCon}>
      <div className={styles.info}>
        <h2>{heading2}</h2>
        <h1>{heading1}</h1>
        <h3>{heading3}</h3>
      </div>
      <div className={styles.imgCon}>
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          fill={true}
          src="/createStay.png"
          alt="Create Stay"
        />
      </div>
    </div>
  );
}
