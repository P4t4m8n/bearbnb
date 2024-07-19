import Image from "next/image";
import styles from "./TransitionPage.module.scss";

interface Props {
  stage: number;
}

export default function TransitionPage({ stage }: Props) {
  const textObj = {
    h1: "",
    h2: "",
    h3: "",
  };

  if (stage === 1) {
    textObj.h1 = "Tell us about your place";
    textObj.h2 = "Step 1";
    textObj.h3 =
      "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.";
  }

  if (stage === 8) {
    textObj.h1 = "Make your place stand out";
    textObj.h2 = "Step 2";
    textObj.h3 =
      "In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.";
  }

  return (
    <div className={styles.pageOne}>
      <div className={styles.info}>
        <h2>{textObj.h2}</h2>
        <h1>{textObj.h1}</h1>
        <h3>{textObj.h3}</h3>
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
