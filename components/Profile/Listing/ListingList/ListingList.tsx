"use client";

import { BookingModel } from "@/model/booking.model";
import styles from "./ListingList.module.scss";
import ListingPreview from "./ListingPreview/ListingPreview";
import { useEffect, useState } from "react";

interface Props {
  listings: BookingModel[];
  onSaveBooking: (booking: any, status: any) => void;
}

export default function ListingList({ listings, onSaveBooking }: Props) {
  const [listingState, setListingState] = useState<BookingModel[]>([]);

  useEffect(() => {
    if (!listings) return;
    setListingState(listings);
  }, [listings]);
  return (
    <ul className={styles.listingList}>
      <li>
        <h4>#</h4>
        <h4>Date</h4>
        <h4>Asset</h4>
        <h4>Guest Bear</h4>
        <h4>Bears</h4>
        <h4>Price</h4>
        <h4>Status</h4>
        <h4>Actions</h4>
      </li>
      {listingState.map((listing, idx) => (
        <ListingPreview
          onUpdateListing={onSaveBooking}
          idx={idx}
          key={listing.id}
          listing={listing}
        />
      ))}
    </ul>
  );
}
