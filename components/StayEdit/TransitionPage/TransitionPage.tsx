import Image from "next/image";
import styles from "./TransitionPage.module.scss";

interface Props {
  h1: string;
  h2: string;
  h3: string;
}

export default function TransitionPage({ h1, h2, h3 }: Props) {
  return (
    <div className={styles.pageOne}>
      <div className={styles.info}>
        <h2>{h2}</h2>
        <h1>{h1}</h1>
        <h3>{h3}</h3>
      </div>
      <div className={styles.imgCon}>
        <Image
          priority={true}
          fill={true}
          sizes="auto"
          src="/createStay.png"
          alt=""
        />
      </div>
    </div>
  );
}
