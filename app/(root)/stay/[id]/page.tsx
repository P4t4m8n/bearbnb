import { getStayById } from "@/actions/stay.action";
import styles from "./Details.module.scss";
import { headers } from "next/headers";
import { BookingModel } from "@/model/booking.model";
import { saveBooking } from "@/actions/booking.action";
import { redirect } from "next/navigation";
import DetailsSkeleton from "@/components/skeletons/DetailsSkeleton/DetailsSkeleton";
import { DetailsHeader } from "@/components/Details/Header/DetailsHeader";
import { ImageList } from "@/components/Details/ImageList/ImageList";
import { DetailsHero } from "@/components/Details/DetailsHero/DetailsHero";
import { HostSmall } from "@/components/Details/HostSmall/HostSmall";
import HighLights from "@/components/Details/HighLights/HighLights";
import About from "@/components/Details/About/About";
import RoomList from "@/components/Details/RoomList/RoomLIst";
import AmentiasList from "@/components/Details/AmentiasList/AmentiasList";
import Booking from "@/components/Booking/Booking";

interface Props {
  params: { id: string };
}

export default async function StayDetails({ params }: Props) {
  const { id } = params;

  const stay = await getStayById(id);
  console.log("stay:", stay)

  const origin = headers().get("origin");

 

  if (!stay) return <DetailsSkeleton />;

  const {
    name,
    rating,
    price,
    location,
    host,
    images,
    capacity,
    description,
    bedRooms,
    baths,
    reviews,
    amenities,
    highlights,
    likes,
  } = stay;
  const { firstName, imgUrl, lastName, ownerSince } = host;
  const _ownerSince = new Date(ownerSince!);

  const numberOfBeds = bedRooms.reduce(
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
            numOfBedrooms={bedRooms.length}
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
          <HighLights highlights={highlights} />
          <About description={stay.description || ""} />
          <RoomList bedrooms={bedRooms} />
          <AmentiasList amenities={amenities} />
          {/* TODO reimplement calender with booking in a global state */}
          {/* <Calendar bookings={stay.bookings} date={new Date()} /> */}
        </section>
        <section className={styles.calendarCon}>
          <Booking stay={stay} />
        </section>
      </div>
    </section>
  );
}
