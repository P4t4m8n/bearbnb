import { BedRoomModel } from "@/model/bedroom.model";
import styles from "./RoomImageUpload.module.scss";
import { AnimatedLogoSVG, PhotosSVG, TrashSVG } from "@/components/svgs/svgs";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  DragEvent,
} from "react";
import { uploadImg } from "@/service/upload.service";
import { handleError } from "@/service/util.service";

interface Props {
  image: string;
  setBedRoomState: Dispatch<SetStateAction<BedRoomModel>>;
}
export default function RoomImageUpload({ image, setBedRoomState }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const removeImg = () => {
    setBedRoomState((prev) => ({ ...prev, image: "" }));
  };

  const onUploadImg = async (file: File) => {
    try {
      setIsLoading(true);
      const image = await uploadImg(file);
      setBedRoomState((prev) => ({ ...prev, image }));
    } catch (error) {
      console.error("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const { target } = ev;
    const { files } = target;
    if (!files) {
      handleError("No files selected");
      return;
    }
    try {
      await onUploadImg(files[0]);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDrop = async (ev: DragEvent<HTMLLabelElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) {
      await onUploadImg(ev.dataTransfer.files[0]);
      ev.dataTransfer.clearData();
    }
  };
  const handleDragOver = (ev: React.DragEvent<HTMLLabelElement>) => {
    ev.preventDefault();
  };

  return (
    <>
      {image && !isLoading && (
        <div className={styles.imgCon}>
          <button className={styles.imgRemoveBtn} onClick={removeImg}>
            <TrashSVG />
          </button>
          <Image fill={true} src={image} alt="bedroom" />
        </div>
      )}
      {!image && !isLoading && (
        <>
          <label
            className={styles.labelSvg}
            htmlFor="file-input-model"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <PhotosSVG />
          </label>

          <input
            id="file-input-model"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </>
      )}
      {isLoading && (
        <div className={styles.loader}>
          <AnimatedLogoSVG />
        </div>
      )}
    </>
  );
}
