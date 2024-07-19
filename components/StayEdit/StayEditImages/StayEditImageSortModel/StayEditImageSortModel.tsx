import { useModal } from "@/hooks/useModal";
import { useRef } from "react";
import styles from "./StayEditImageSortModel.module.scss";
import { DotsSVG } from "@/components/svgs/svgs";

interface Props {
  imgIdx: number;
  arrangeImages: (imgIdx: number, dir: number) => void;
  isLast: boolean;
  imgUrl: string;
  setImages: (imgUrl: string, isDelete: boolean) => void;
}
export default function StayEditImageSortModel({
  imgIdx,
  arrangeImages,
  isLast,
  imgUrl,
  setImages,
}: Props) {
  const imageSortModelRef = useRef<HTMLUListElement | null>(null);
  const [imageSortModelOpen, setImageSortModelOpen] =
    useModal(imageSortModelRef);
  return (
    <>
      <button
        className={styles.sortModelBtn}
        onClick={() => setImageSortModelOpen(true)}
      >
        <DotsSVG />
      </button>
      {imageSortModelOpen && (
        <ul className={styles.imageSortModel} ref={imageSortModelRef}>
          {imgIdx > 0 && (
            <button onClick={() => arrangeImages(imgIdx, 1)}>
              Move backward
            </button>
          )}
          {!isLast && (
            <button onClick={() => arrangeImages(imgIdx, -1)}>
              Move forward
            </button>
          )}

          {imgIdx > 0 && (
            <button onClick={() => arrangeImages(imgIdx, 0)}>
              Make cover photo
            </button>
          )}
          {imgIdx > 0 && (
            <button onClick={() => arrangeImages(imgIdx, 1)}>
              Move backward
            </button>
          )}
          <button onClick={() => setImages(imgUrl, true)}>Delete</button>
        </ul>
      )}
    </>
  );
}
