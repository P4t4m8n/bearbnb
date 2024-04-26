import Image from "next/image";
import { Stay } from "../../model/stay.model";
import { getStayById } from "../../service/stay-service";
import {
  AvatarSVG,
  DoubleBedSVG,
  LikeSVG,
  RatingSVG,
  SelfCheckInSVG,
  ShareSVG,
  WifiSVG,
} from "../../ui/svgs/svgs";
import styles from "./Details.module.scss";

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
  const { name, rating, price, location, summary } = stay as Stay;
  const images: ImagesUrl[] = stay.images;
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
            <LikeSVG className="svg" />
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
          <AvatarSVG className="" />
          <p>Hosted by Bobo</p>
          <p>Superhost . 9 years hosting</p>
        </div>

        <ul>
          <li>
            <SelfCheckInSVG />
            <h4>Self check-in</h4>
            <h5>Check yourself in with the keypad.</h5>
          </li>
          <li>
            <SelfCheckInSVG />
            <h4>Self check-in</h4>
            <h5>Check yourself in with the keypad.</h5>
          </li>
        </ul>
        <p className="description">{summary}</p>
        <ul>
          <h2> Where you’ll sleep</h2>
          <li>
            <DoubleBedSVG />
            <h4>Bedroom</h4>
            <h5>1 double bed</h5>
          </li>
        </ul>

        <ul>
          <h2>What this place offers</h2>
          <li>
            <WifiSVG />
            <h3>Wifi</h3>
          </li>
          <li>
            <WifiSVG />
            <h3>Wifi</h3>
          </li>
          <li>
            <WifiSVG />
            <h3>Wifi</h3>
          </li>
          <li>
            <WifiSVG />
            <h3>Wifi</h3>
          </li>
          <button>show all 42 amenities</button>
        </ul>
        <div className="calenderCon"></div>
      </section>
    </section>
  );
}
