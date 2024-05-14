"use client";

import { ListingModelSmall } from "@/model/booking.model";
import styles from "./ListingList.module.scss";
import ListingCard from "./ListingCard/ListingCard";
import { useEffect, useState } from "react";

interface Props {
  listings: ListingModelSmall[];
  onSaveBooking: (booking: any, status: any) => void;
}

export default function ListingList({ listings, onSaveBooking }: Props) {
  const [listingState, setListingState] = useState<ListingModelSmall[]>([]);

  useEffect(() => {
    if (!listings) return;
    setListingState(listings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <ListingCard
          onUpdateListing={onSaveBooking}
          idx={idx}
          key={listing.id}
          listing={listing}
        />
      ))}
    </ul>
  );
}
