import { BookingDTO, BookingModel } from "../../../model/stay.model";
import { ScrollBySVG, SelfCheckInSVG } from "../../../components/ui/svgs/svgs";
import styles from "./Details.module.scss";
import RoomList from "@/components/ui/Details/RoomList/RoomLIst";
import AmentiasList from "@/components/ui/Details/AmentiasList/AmentiasList";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import { DetailsHeader } from "@/components/ui/Details/Header/DetailsHeader";
import { ImageList } from "@/components/ui/Details/ImageList/ImageList";
import { DetailsHero } from "@/components/ui/Details/DetailsHero/DetailsHero";
import { HostSmall } from "@/components/ui/Details/HostSmall/HostSmall";
import Booking from "@/components/ui/Booking/Booking";
import { prisma } from "@/prisma/prisma";
import { z } from "zod";
import { getStayById } from "@/service/stay.server";

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
    amenities,
    likes,
  } = stay;
  const { firstName, imgUrl, lastName, ownerSince } = host;
  const _ownerSince = new Date(ownerSince!);

  const numberOfBeds = bedrooms.reduce(
    (acc, currValue) => acc + currValue.beds.length,
    0
  );
  const currentDate = new Date();
  const years = ownerSince
    ? currentDate.getFullYear() - _ownerSince.getFullYear()
    : 0;

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
          <HostSmall
            imgUrl={imgUrl || ""}
            firstName={firstName}
            lastName={lastName}
            years={years}
          />

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
              <ScrollBySVG />
            </button>
          </div>
          <RoomList bedrooms={bedrooms} />
          <AmentiasList amenities={amenities} />
          <Calendar bookings={stay.booking} date={new Date()} />
        </section>
        <section className={styles.calendarCon}>
          <Booking price={price} stay={stay} />
        </section>
      </div>
    </section>
  );
}
