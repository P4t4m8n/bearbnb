import { ChangeEvent, useCallback, useRef } from "react";
import styles from "./StayEditImages.module.scss";
import { StayType } from "@/model/stay.model";
import Image from "next/image";
import { uploadImg } from "@/service/upload.service";
import { useModal } from "@/hooks/useModal";
import { PhotosSVG, PlusSVG, TrashSVG } from "@/components/svgs/svgs";
import StayEditImageSortModel from "./StayEditImageSortModel/StayEditImageSortModel";

interface Props {
  images: string[];
  setImages: (imgUrl: string, isDelete: boolean) => void;
  type: StayType;
  arrangeImages: (imgIdx: number, dir: number) => void;
}

export default function StayEditImages({
  images,
  setImages,
  type,
  arrangeImages,
}: Props) {
  const uploadModelRef = useRef<HTMLDivElement | null>(null);
  const [isUploadModelOpen, setIsUploadModelOpen] = useModal(uploadModelRef);

  const onUploadImg = async (file: File) => {
    try {
      const imgUrl = await uploadImg(file);
      setImages(imgUrl, false);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleFileChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    try {
      const { target } = ev;
      const { files } = target;
      if (!files) throw new Error("No files selected");
      await onUploadImg(files[0]);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) {
      await onUploadImg(ev.dataTransfer.files[0]);
      ev.dataTransfer.clearData();
    }
  };

  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const handleSetRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      uploadModelRef.current = node;
    }
  }, []);

  return (
    <section className={styles.imageEdit}>
      {(!images.length || isUploadModelOpen) && (
        <div className={styles.notImages}>
          <h1>{`Add some photos of you ${type.toLowerCase()}`}</h1>
          <p>{`You'll need 5 photos to get started. You can add more or make change later`}</p>
          <div>
            <Image width={160} height={160} src="/camera.png" alt="" />
            <button onClick={() => setIsUploadModelOpen(true)}>
              Add photos
            </button>
          </div>
        </div>
      )}
      {isUploadModelOpen && (
        <div
          ref={handleSetRef}
          className={styles.uploadModel}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className={styles.uploadModelHeader}>
            <button onClick={() => setIsUploadModelOpen(false)}>
              <PlusSVG />
            </button>
            <div>
              <h3>Upload photos</h3>
              <h5>{!images.length ? "No items selected" : ""}</h5>
            </div>
            <label className={styles.labelSvg} htmlFor="file-input-model">
              <PlusSVG />
            </label>
          </div>
          {!images.length && (
            <div className={styles.uploadModelBody}>
              <PhotosSVG />
              <h2>Drag and drop</h2>
              <h6>Or browse for photos</h6>
              <label className={styles.labelBtn} htmlFor="file-input-model">
                Browse
              </label>
            </div>
          )}

          {!!images.length && (
            <ul className={styles.uploadModelImages}>
              {images.map((img, idx) => (
                <li key={idx}>
                  <Image src={img} alt="" sizes="auto" fill={true} />
                  <button
                    className={styles.deleteBtn}
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      setImages(img, true);
                    }}
                  >
                    <TrashSVG />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.actions}>
            <button onClick={() => setIsUploadModelOpen(false)}>Done</button>
            <button
              disabled={!images.length}
              className={!images.length ? styles.disabled : ""}
              onClick={() => setIsUploadModelOpen(false)}
            >
              Upload
            </button>
          </div>

          <input
            id="file-input-model"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>
      )}
      {!isUploadModelOpen && !!images.length && (
        <div className={styles.imageEditList}>
          <div className={styles.imageEditListHeader}>
            <div>
              <h1>Choose at least 5 photos</h1>
              <p>You can re-order your photos</p>
            </div>
            <label className={styles.labelSvg} htmlFor="file-input">
              <PlusSVG />
            </label>
          </div>
          <ul className={styles.imageEditListSort}>
            {images.map((img, idx) => (
              <li key={idx}>
                {idx === 0 && <span>Cover photo</span>}
                <Image src={img} alt="" sizes="auto" fill={true} />
                <StayEditImageSortModel
                  imgIdx={idx}
                  imgUrl={img}
                  isLast={idx === images.length - 1}
                  setImages={setImages}
                  arrangeImages={arrangeImages}
                />
              </li>
            ))}
            <label className={styles.labelBox} htmlFor="file-input">
              <PlusSVG />
              <p>Add more</p>
            </label>
          </ul>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </div>
      )}
    </section>
  );
}
