import Image from "next/image";
import styles from "./ImageList.module.scss";

interface Props {
  images: string[];
}

export function ImageList({ images }: Props) {
  const slicedImages = images.slice(0, 5);
  return (
    <ul className={styles.imageList}>
      {slicedImages.map((img, idx) => (
        <li key={idx}>
          <Image sizes="auto" src={img} fill={true} alt=""></Image>
        </li>
      ))}
    </ul>
  );
}
