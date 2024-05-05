"use client";

import { useModal } from "@/components/hooks/useModal";
import { useBookingStore } from "@/store/useBookingStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ConfirmBooking() {
  const { booking, setBooking } = useBookingStore();

  const bookingConfirmModalRef = useRef<HTMLDivElement | null>(null);
  const [isBookingConfirm, setIsBookingConfirm] = useModal(
    bookingConfirmModalRef,
    null
  );

  const searchParams = useSearchParams();
  const showModal = searchParams.get("showDialog");

  useEffect(() => {
    if (showModal === "y") {
      setIsBookingConfirm(true);
    } else {
      setIsBookingConfirm(false);
    }
  }, [showModal]);

  return (
    <>
      {isBookingConfirm ? (
        <section ref={bookingConfirmModalRef}>
          <h1>One last step</h1>
          <p>
            Dear guest, <br></br>In order to complete your reservation,please
            confirm you trip details
          </p>
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
        </section>
      ) : null}
    </>
  );
}
