import { BedRoom } from "../../../model/stay.model";
import { getStayById } from "../../../service/stay-service";
import { ScrollBySVG, SelfCheckInSVG } from "../../../components/ui/svgs/svgs";
import styles from "./Details.module.scss";
import RoomList from "@/components/ui/Details/RoomList/RoomLIst";
import AmentiasList from "@/components/ui/Details/AmentiasList/AmentiasList";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import { DetailsHeader } from "@/components/ui/Details/Header/DetailsHeader";
import { ImageList } from "@/components/ui/Details/ImageList/ImageList";
import { DetailsHero } from "@/components/ui/Details/DetailsHero/DetailsHero";
import { HostSmall } from "@/components/ui/Details/HostSmall/HostSmall";

interface Props {
  params: any;
}

export default async function StayDetails({ params }: Props) {
  const { id } = params;

  const stay = await getStayById(id);

  if (!stay) return <div>Loading</div>;
  const {
    name,
    rating,
    price,
    location,
    host,
    images,
    capacity,
    description,
    bedrooms,
    baths,
    reviews,
    likes,
  } = stay;
  const { fullname, imgUrl } = host;
  const ownerSince = new Date(host.ownerSince);
  const currentDate = new Date();
  const years = ownerSince
    ? currentDate.getFullYear() - ownerSince.getFullYear()
    : 0;
  const numberOfBeds = bedrooms.reduce(
    (acc: number, bedroom: BedRoom): number => {
      return acc + (bedroom.beds ? bedroom.beds.length : 0);
    },
    0
  );
  return (
    <section className={styles.details}>
      <DetailsHeader name={name} />
      <ImageList images={images} />
      <div className={styles.con}>
        <section className={styles.detailsInfo}>
          <DetailsHero
            capacity={capacity}
            numOfBedrooms={bedrooms.length}
            numberOfBeds={numberOfBeds}
            baths={baths || 0}
            rating={rating}
            reviewsLength={reviews?.length || 0}
            country={location.country}
            address={location.address}
          />
          <HostSmall imgUrl={imgUrl} fullname={fullname} years={years} />

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
            <p className="description">{description}</p>
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
