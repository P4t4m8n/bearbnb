import styles from "./Details.module.scss";
import RoomList from "@/components/ui/Details/RoomList/RoomLIst";
import AmentiasList from "@/components/ui/Details/AmentiasList/AmentiasList";
import { Calendar } from "@/components/ui/Calendar/Calendar";
import { DetailsHeader } from "@/components/ui/Details/Header/DetailsHeader";
import { ImageList } from "@/components/ui/Details/ImageList/ImageList";
import { DetailsHero } from "@/components/ui/Details/DetailsHero/DetailsHero";
import { HostSmall } from "@/components/ui/Details/HostSmall/HostSmall";
import Booking from "@/components/ui/Booking/Booking";
import { getStayById } from "@/service/stay.server";
import { saveBooking } from "@/service/booking.server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HighLights from "@/components/ui/Details/HighLights/HighLights";
import About from "@/components/ui/Details/About/About";
import { BookingModel } from "@/model/booking.model";

interface Props {
  params: any;
}

export default async function StayDetails({ params }: Props) {
  const { id } = params;

  const stay = await getStayById(id);

  const onSaveBooking = async (booking: BookingModel) => {
    "use server";
    const origin = headers().get("origin");
    const savedBooking = await saveBooking(booking);
    if (!savedBooking) throw new Error("unable to save");
    redirect(`${origin}/booking/${savedBooking?.id}`);
  };

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
    highlights,
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
          <HighLights highlights={highlights} />
          <About description={stay.description || ""} />
          <RoomList bedrooms={bedrooms} />
          <AmentiasList amenities={amenities} />
          <Calendar bookings={stay.bookings} date={new Date()} />
        </section>
        <section className={styles.calendarCon}>
          <Booking onSaveBooking={onSaveBooking} price={price} stay={stay} />
        </section>
      </div>
    </section>
  );
}
