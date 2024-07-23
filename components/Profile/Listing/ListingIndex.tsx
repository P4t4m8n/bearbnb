import ListingList from "./ListingList/ListingList";
import { Suspense } from "react";
import MyStayListSkeleton from "../../skeletons/MyStayListsSkeleton/MyStayListSkeleton";
import { BookingModel } from "@/model/booking.model";
import { StatusType } from "@/model/status.type";
import { getBookings, saveBooking } from "@/actions/booking.action";

export default async function ListingIndex({ hostId }: { hostId: string }) {
  //Server component to manage functions
  const bookings = await getBookings({ hostId });
  const onSaveBooking = async (booking: BookingModel, status: StatusType) => {
    "use server";
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
