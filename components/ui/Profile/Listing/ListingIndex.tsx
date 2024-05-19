import { Status } from "@/model/status.type";
import ListingList from "./ListingList/ListingList";
import { getHostListing, saveBooking } from "@/service/booking.server";
import { Suspense } from "react";
import MyStayListSkeleton from "../../skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { BookingModel } from "@/model/booking.model";

export default async function ListingIndex({ userId }: { userId: string }) {
  //Server component to manage functions
  const bookings = await getHostListing(userId);
  const onSaveBooking = async (booking: BookingModel, status: Status) => {
    "use server";
    console.log("BookingModel:", booking)
    const bookingDTO = { ...booking, status };
    const response = await saveBooking(bookingDTO);
    return response;
  };

  return (
    <Suspense fallback={<MyStayListSkeleton />}>
      <ListingList onSaveBooking={onSaveBooking} listings={bookings} />
    </Suspense>
  );
}
