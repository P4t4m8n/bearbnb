import Image from "next/image";
import styles from "./ImageList.module.scss";
import { ImageModel } from "@/model/stay.model";

interface Props {
  images: string[];
}

export function ImageList({ images }: Props) {
  return (
    <ul className={styles.imageList}>
      {images.map((img, idx) => (
        <li key={idx}>
          <Image sizes="auto" src={img} fill={true} alt=""></Image>
        </li>
      ))}
    </ul>
  );
}
