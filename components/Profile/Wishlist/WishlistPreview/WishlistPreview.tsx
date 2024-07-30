import Link from "next/link";
import styles from "./WishlistPreview.module.scss";
import Image from "next/image";
import { LikeExtendedModel } from "@/model/Like.model";
import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import { RatingSVG } from "@/components/svgs/svgs";
import AddNote from "@/components/Buttons/AddNote/AddNote";
import { transformBedrooms } from "@/service/stay.service";
import { saveLike } from "@/actions/like.action";

interface Props {
  likeExtended: LikeExtendedModel;
}

export default function WishlistPreview({
  likeExtended,
}: Props) {
  const {
    stayName,
    images,
    type,
    city,
    country,
    rating,
    description,
    bedrooms,
    _id,
    stayId,
    userId,
    note,
  } = likeExtended;

  const roundNum = Number(rating.toFixed(2));
  // const formattedBedrooms = transformBedrooms(bedrooms);

  const onSaveNote = async (txt: string) => {
    const likeToSave = {
      _id,
      stayId,
      userId,
      note: txt,
    };

    try {
      await saveLike(likeToSave);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <li className={styles.preview}>
      <LikeButton stayId={stayId!} />
      <Link href={`stay/${stayId}`}>
        <div className={styles.imgCon}>
          <Image
            src={images[0]}
            fill={true}
            alt=""
            className={styles.image}
          ></Image>
        </div>
        <div className={styles.infoHead}>
          <h3>
            {type} in {city}
          </h3>
          <div className={styles.rating}>
            <RatingSVG  />
            <h5>{roundNum}</h5>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </Link>
      <AddNote onSaveNote={onSaveNote} txt={note} />
    </li>
  );
}
