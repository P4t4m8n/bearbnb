"use client";
import { useModal } from "@/components/hooks/useModal";
import { BookingModel } from "@/model/stay.model";
import { useBookingStore } from "@/store/useBookingStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  saveBooking: (booking: BookingModel) => void;
}

export default function ConfirmBookingModal({ saveBooking }: Props) {
  const router = useRouter();
  const { booking } = useBookingStore.getState();
  const bookingConfirmModalRef = useRef<HTMLDivElement | null>(null);
  const [isBookingConfirm, setIsBookingConfirm] = useModal(
    bookingConfirmModalRef,
    null
  );

  const searchParams = useSearchParams();
  const confirmBooking = searchParams.get("confirmBooking");
  useEffect(() => {
    if (confirmBooking === "y") {
      setIsBookingConfirm(true);
    } else {
      setIsBookingConfirm(false);
    }
  }, [confirmBooking]);

  if (!booking.checkIn || !booking.checkOut) return;
  const daysBetweenDates = (date1: Date, date2: Date) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = Math.abs(date2.getTime() - date1.getTime());
    const diffInDays = Math.ceil(diffInTime / oneDay);

    return diffInDays;
  };

  const days = daysBetweenDates(booking.checkIn!, booking.checkOut!);
  return (
    <>
      {isBookingConfirm ? (
        <section ref={bookingConfirmModalRef}>
          <header>
            <h1>One last step</h1>
            <p>
              Dear guest, <br></br>In order to complete your reservation,please
              confirm you trip details
            </p>
          </header>
          <div>
            <h2>Reservation details</h2>
            <div>
              <div>
                <h3>Trip dates:</h3>
                <h4>
                  {booking.checkIn?.toDateString()} -
                  {booking.checkOut?.toDateString()}
                </h4>
              </div>
              <div>
                <h3>Guests</h3>
                <h4>
                  {`${booking.adults} ${
                    booking.adults > 1 ? "adults" : "adult"
                  } ${booking.children} ${
                    booking.children > 1 ? "children" : "child"
                  } ${booking.infants} ${
                    booking.infants > 1 ? "infants" : "infant"
                  }
              `}
                </h4>
              </div>
            </div>
            <div>
              <h3>Price Details</h3>
              <div>
                <h4>{`$${booking.price} x ${days}`}</h4>
                <h4>{`$${booking.price * days}`}</h4>
              </div>
              <div>
                <h4>Service fee</h4>
                <h4>$42</h4>
              </div>
            </div>
            <div>
              <h4>Total</h4>
              <h4>{`$${booking.price * days + 42} `}</h4>
            </div>
          </div>
          <div>
            <Image src={booking.stay?.image!} fill={true} alt=""></Image>
          </div>
          <div>
            <button onClick={() => router.back()}>back</button>
            <button onClick={() => saveBooking(booking)}>Confirm</button>
          </div>
        </section>
      ) : null}
    </>
  );
}
