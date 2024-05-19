import { AvatarSVG } from "@/components/ui/svgs/svgs";
import { BookingModel } from "@/model/booking.model";
import { formatDatesToRange } from "@/service/stay.service";
import Image from "next/image";
import styles from "./ListingPreview.module.scss";
import { MouseEvent, useState } from "react";
import { Status } from "@/model/status.type";

interface Props {
  onUpdateListing: (listing: BookingModel, status: Status) => void;
  listing: BookingModel;
  idx: number;
}

export default function ListingPreview({
  listing,
  idx,
  onUpdateListing,
}: Props) {
  const [listingState, setListingState] = useState<BookingModel>(listing);
  const [loading, setLoading] = useState(false);
  const {
    checkIn,
    checkOut,
    stay,
    user,
    price,
    status,
    children,
    infants,
    pets,
    adults,
    bookingTime,
  } = listingState;

  const onListingClick = async (ev: MouseEvent, isConfirmed: boolean) => {
    ev.preventDefault();
    const prevStatus = listingState.status;
    try {
      const newStatus = isConfirmed ? "confirmed" : "canceled";
      setLoading(true);
      setListingState({
        ...listingState,
        status: newStatus,
      });

      onUpdateListing(listingState, isConfirmed ? "confirmed" : "canceled");
    } catch (error) {
      console.error("error:", error);
      setListingState({
        ...listingState,
        status: prevStatus,
      });
    } finally {
      setLoading(false);
    }
  };
  const dates = formatDatesToRange([new Date(checkIn!), new Date(checkOut!)]);
  const year = new Date(checkIn!).getFullYear();
  const totalGuests = adults + children + infants + pets;

  let statusColors = "";
  switch (status) {
    case "pending":
      statusColors = "#9F4D9C";
      break;
    case "confirmed":
      statusColors = "#D83C87";
      break;
    case "canceled":
      statusColors = "#2F4858";
      break;
    case "completed":
      statusColors = "#FF385C";
      break;
  }

  return (
    <li className={styles.listing}>
      <h3 className={styles.listNum}>{idx + 1}</h3>
      <h3 className={styles.bookingDate}>
        {new Date(bookingTime).toLocaleDateString()}
      </h3>
      <div className={styles.stayInfo}>
        <Image
          sizes="auto"
          className={styles.stayImg}
          src={stay.images[0].url}
          width={40}
          height={40}
          alt={stay.name}
        />
        <div>
          <h2>{stay.name}</h2>
          <h3>{`${dates}, ${year}`}</h3>
        </div>
      </div>
      <div className={styles.bookerInfo}>
        {user.imgUrl ? (
          <Image src={user.imgUrl} width={40} height={40} alt=""></Image>
        ) : (
          <AvatarSVG className={styles.svg} />
        )}
        <h3>
          <span> {user.lastName}</span>
          <span>{user.firstName}</span>
        </h3>
      </div>
      <h3 className={styles.guestsNum}>{totalGuests}</h3>
      <h3 className={styles.price}>${price}</h3>
      <h3 style={{ color: statusColors }} className={styles.status}>
        {status}
      </h3>

      <div className={styles.actions}>
        <button onClick={(ev) => onListingClick(ev, true)} disabled={loading}>
          Confirm
        </button>
        <button onClick={(ev) => onListingClick(ev, false)} disabled={loading}>
          Reject
        </button>
      </div>
    </li>
  );
}
