import Image from "next/image";
import styles from "./HostSmall.module.scss";

interface Props {
  imgUrl: string;
  firstName: string;
  lastName: string;
  years: number;
}
export function HostSmall({ imgUrl, lastName, firstName, years }: Props) {
  return (
    <div className={styles.host}>
      <div>
        <Image sizes="auto" src={imgUrl} fill={true} alt=""></Image>
      </div>
      <p>
        Hosted by {lastName} {firstName}
      </p>
      <p>{years} years hosting</p>
    </div>
  );
}
