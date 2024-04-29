import Image from "next/image";
import styles from "./HostSmall.module.scss";

interface Props {
  imgUrl: string;
  fullname: string;
  years: number;
}
export function HostSmall({ imgUrl, fullname, years }: Props) {
  return (
    <div className={styles.host}>
      <div>
        <Image src={imgUrl} fill={true} alt=""></Image>
      </div>
      <p>Hosted by {fullname}</p>
      <p>{years} years hosting</p>
    </div>
  );
}
