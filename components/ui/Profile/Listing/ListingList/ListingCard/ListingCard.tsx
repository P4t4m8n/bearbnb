import { AvatarSVG } from "@/components/ui/svgs/svgs";
import { ListingModelSmall } from "@/model/booking.model";
import { formatDatesToRange, getDefaultDates } from "@/service/stay.service";
import Image from "next/image";
import styles from "./ListingCard.module.scss";
import { MouseEvent, useState } from "react";
import { Status } from "@/model/types.model";

interface Props {
  onUpdateListing: (listing: ListingModelSmall, status: Status) => void;
  listing: ListingModelSmall;
  idx: number;
}

export default function ListingCard({ listing, idx, onUpdateListing }: Props) {
  const [listingState, setListingState] = useState<ListingModelSmall>(listing);
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
      setLoading(true);
      setListingState({
        ...listingState,
        status: isConfirmed ? "confirmed" : "canceled",
      });

      const t = await onUpdateListing(
        listingState,
        isConfirmed ? "confirmed" : "canceled"
      );
      console.log("t:", t);
    } catch (error) {
      console.log("error:", error);
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
          className={styles.stayImg}
          src={stay.image}
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
