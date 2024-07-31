"use client";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./ConfirmBookingModal.module.scss";
import {
  bookingToBookingDTO,
  daysBetweenDates,
} from "@/service/booking.service";
import { getDefaultDates } from "@/service/stay.service";
import { BookingModel } from "@/model/booking.model";
import { saveBooking } from "@/actions/booking.action";
import { usePathname, useRouter } from "next/navigation";
interface Props {
  booking: BookingModel;
  setBooking: Dispatch<SetStateAction<BookingModel>>;
  diffInDays: number;
  pricePerNight: number;
}

export default function ConfirmBookingModal({
  booking,
  setBooking,
  diffInDays,
  pricePerNight,
}: Props) {
  const bookingConfirmModalRef = useRef<HTMLDivElement | null>(null);
  const [isBookingConfirm, setIsBookingConfirm] = useModal(
    bookingConfirmModalRef
  );

  const router = useRouter();
  const path = usePathname();

  const onBook = () => {
    if (!booking.user) return alert("No user");

    const price = pricePerNight * diffInDays;
    setBooking((prev) => ({ ...prev, price }));
    setIsBookingConfirm(true);
  };

  const onSaveBooking = async () => {
    try {
      const bookingDto = bookingToBookingDTO(booking);
      const bookingId = await saveBooking(bookingDto);
      router.push(`/booking/${bookingId}`);
    } catch (error) {
      console.error("error:", error);
    }
  };

  if (!booking.checkIn || !booking.checkOut) return;

  const getGuestsString = (booking: BookingModel): string => {
    let str = ``;
    str += `${booking.adults} ${booking.adults > 1 ? "adults" : "adult"}`;
    str +=
      booking.children > 0
        ? `${booking.children} ${booking.children > 1 ? "children" : "child"}`
        : "";
    str +=
      booking.infants > 0
        ? ` booking.infants
      } ${booking.infants > 1 ? "infants" : "infant"}`
        : "";

    return str;
  };

  const days = daysBetweenDates(booking.checkIn, booking.checkOut);
  const guests = getGuestsString(booking);
  const { checkIn, checkOut } = booking;
  const { formatCheckIn, formatCheckOut } = getDefaultDates(null, {
    checkIn,
    checkOut,
  });

  return (
    <>
      <button onClick={() => onBook()} className={styles.bookBtn}>
        Reserve
      </button>
      {isBookingConfirm ? (
        <section className={styles.bookingModal} ref={bookingConfirmModalRef}>
          <div className={styles.bookingModalHeader}>
            <h1>One last step</h1>
            <p>
              Dear guest, <br />
              In order to complete your reservation,please confirm you trip
              details
            </p>
          </div>
          <div className={styles.bookingInfo}>
            <h2>Reservation details:</h2>
            <div className={styles.datesGuests}>
              <div>
                <h3>Trip dates:</h3>
                <h4>
                  {`${formatCheckIn.day}/${formatCheckIn.month}/${formatCheckIn.year}`}
                  -
                  {`${formatCheckOut.day}/${formatCheckOut.month}/${formatCheckOut.year}`}
                </h4>
              </div>
              <div>
                <h3>Guests:</h3>
                <h4>{guests}</h4>
              </div>
            </div>
            <div className={styles.priceDetails}>
              <h3>Price Details</h3>
              <div>
                <h4>{`$${booking.price} x ${days} nights`}</h4>
                <h4>{`$${booking.price * days}`}</h4>
              </div>
              <div>
                <h4>Honey fee</h4>
                <h4>$42</h4>
              </div>
            </div>
            <div className={styles.total}>
              <h4>Total</h4>
              <h4>{`$${booking.price * days + 42} `}</h4>
            </div>
          </div>
          <div className={styles.imageBox}>
            <div className={styles.imgCon}>
              <Image
                sizes="auto"
                src={booking.stay.image}
                fill={true}
                alt=""
              ></Image>
            </div>
            <h5>{booking.stay?.name || ""}</h5>
          </div>
          <div className={styles.actions}>
            <button onClick={() => setIsBookingConfirm(false)}>back</button>
            <button onClick={() => onSaveBooking()}>Confirm</button>
          </div>
        </section>
      ) : null}
    </>
  );
}
