import Image from "next/image";
import { Stay } from "../../model/stay.model";
import { getStayById } from "../../service/stay-service";
import {
  AvatarSVG,
  DoubleBedSVG,
  LikeSVG,
  RatingSVG,
  ScrollBySVG,
  SelfCheckInSVG,
  ShareSVG,
  WifiSVG,
} from "../../ui/svgs/svgs";
import styles from "./Details.module.scss";
import { faker } from "@faker-js/faker";
import RoomList from "@/app/ui/Details/RoomList/RoomLIst";
import AmentiasList from "@/app/ui/Details/AmentiasList/AmentiasList";
import { Calendar } from "@/app/ui/Calendar/Calendar";

interface Props {
  params: any;
}

interface ImagesUrl {
  url: string;
}
export default async function StayDetails({ params }: any) {
  const { id } = params;

  const stay = await getStayById(id);

  if (!stay) return <div>Loading</div>;
  const { name, rating, price, location } = stay as Stay;
  const summary = faker.lorem.paragraphs(10);
  const images: ImagesUrl[] = stay.images;
  const avatar = "https://avatars.githubusercontent.com/u/97165289";
  return (
    <section className={styles.details}>
      <header>
        <h1>{name}</h1>
        <div>
          <button>
            <ShareSVG />
            <span>Share</span>
          </button>
          <button>
            <LikeSVG className="" />
            <span>Save</span>
          </button>
        </div>
      </header>
      <ul className={styles.detailsImgs}>
        {images.map((img, idx) => (
          <li key={idx}>
            <Image src={img.url} fill={true} alt=""></Image>
          </li>
        ))}
      </ul>
      <div className={styles.con}>
        <section className={styles.detailsInfo}>
          <div className={styles.detailsHero}>
            <header>
              <h2>{location.address}</h2>
              <h2>{", " + location.country}</h2>
            </header>
            <div className={styles.stayInfo}>
              <h3>2 guests</h3>
              <h3>1 bedroom</h3>
              <h3>1 bed</h3>
              <h3>1 bath</h3>
            </div>
            <div className={styles.rating}>
              <RatingSVG className="" />
              <p>{rating}</p>
              <a> 228 reviews</a>
            </div>
          </div>

          <div className={styles.host}>
            <div>
              <Image src={avatar} fill={true} alt=""></Image>
            </div>
            <p>Hosted by Bobo</p>
            <p>9 years hosting</p>
          </div>

          <ul className={styles.highlights}>
            <li>
              <SelfCheckInSVG />
              <p>Self check-in</p>
              <p>Check yourself in with the keypad.</p>
            </li>
            <li>
              <SelfCheckInSVG />
              <p>Self check-in</p>
              <p>Check yourself in with the keypad.</p>
            </li>
          </ul>
          <div className={styles.about}>
            <h1>About this place</h1>
            <p className="description">{summary}</p>
            <button>
              <span>Show more</span>
              <ScrollBySVG className="" />
            </button>
          </div>
          <RoomList />
          <AmentiasList />

          <Calendar date={new Date()} />
        </section>
        <section className={styles.book}></section>
      </div>
    </section>
  );
}
