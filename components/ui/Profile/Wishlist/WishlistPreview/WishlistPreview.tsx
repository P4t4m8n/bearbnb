import Link from "next/link";
import styles from "./WishlistPreview.module.scss";
import Image from "next/image";
import { WishListModel } from "@/model/Like.model";
import LikeButton from "@/components/ui/Buttons/LikeButton/LikeButton";
import { RatingSVG } from "@/components/ui/svgs/svgs";
import AddNote from "@/components/ui/Buttons/AddNote/AddNote";
import { transformBedrooms } from "@/service/stay.service";
import { updateLikeNotes } from "@/service/like.server";

interface Props {
  likeObj: WishListModel;
  // updateLikeNote: (likeId: string, txt: string) => void;
}

export default function WishlistPreview({ likeObj }: Props) {
  const { id, stay, notes } = likeObj;
  const { name, image, stayId, location, type, rating, description, bedrooms } =
    stay;
  const { city, country } = location;
  const roundNum = Number(rating.toFixed(2));
  const formattedBedrooms = transformBedrooms(bedrooms);

  const onSaveNote = async (txt: string) => {
    "use server";
    updateLikeNotes(id, txt);
  };

  return (
    <li className={styles.preview}>
      <LikeButton stayId={stayId} />
      <Link href={`stay/${stayId}`}>
        <div className={styles.imgCon}>
          <Image
            src={image}
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
            <RatingSVG className={styles.ratingSvg} />
            <h5>{roundNum}</h5>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </Link>
      <AddNote onSaveNote={onSaveNote} txt={notes} />
    </li>
  );
}
