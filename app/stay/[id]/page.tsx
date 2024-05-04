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
import { getStayById } from "@/service/stay-service";

interface Props {
  params: any;
}

export default async function StayDetails({ params }: Props) {
  const { id } = params;

  const stay = await getStayById(id);

  const saveBooking = async (booking: BookingModel) => {
    "use server";
    const bookingSchema = z
      .object({
        stayId: z.string(),
        userId: z.string(),
        hostId: z.string(),
        price: z
          .number()
          .min(0, { message: "Price must be a non-negative number." }),
        adults: z
          .number()
          .min(1, { message: "At least one adult must be specified." }),
        children: z.number().min(0).default(0),
        infants: z.number().min(0).default(0),
        pets: z.number().min(0).default(0),
        checkIn: z.date(),
        checkOut: z.date(),
        bookingTime: z.date(),
      })
      .refine((data) => data.checkIn < data.checkOut, {
        message: "Check-in date must be before check-out date.",
      });

    const bookingDTO: BookingDTO = {
      stayId: booking.stay?.id!,
      userId: booking.user?.id!,
      hostId: booking.host?.id!,
      price: booking.price,
      adults: booking.adults,
      children: booking.children,
      infants: booking.infants,
      pets: booking.pets,
      checkIn: booking.checkIn!,
      checkOut: booking.checkOut!,
      bookingTime: new Date(),
    };
    const parsedBooking = bookingSchema.parse(bookingDTO);

    try {
      const newBooking = await prisma.booking.create({
        data: {
          stayId: parsedBooking.stayId,
          userId: parsedBooking.userId,
          hostId: parsedBooking.hostId,
          price: parsedBooking.price,
          adults: parsedBooking.adults,
          children: parsedBooking.children,
          infants: parsedBooking.infants,
          pets: parsedBooking.pets,
          checkIn: parsedBooking.checkIn,
          checkOut: parsedBooking.checkOut,
          bookingTime: new Date(),
        },
      });
      return newBooking;
    } catch (error) {
      console.error(error);
    }
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
          <Calendar date={new Date()} />
        </section>
        <section className={styles.calendarCon}>
          <Booking saveBooking={saveBooking} price={price} stay={stay} />
        </section>
      </div>
    </section>
  );
}
