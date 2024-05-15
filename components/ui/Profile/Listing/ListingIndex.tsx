import { Status } from "@/model/status.type";
import ListingList from "./ListingList/ListingList";
import { getHostListing, saveBooking } from "@/service/booking.server";

export default async function ListingIndex({ userId }: { userId: string }) {
  //Server component to manage functions
  const bookings = await getHostListing(userId);
  const onSaveBooking = async (booking: any, status: Status) => {
    "use server";
    const bookingDTO = { ...booking, status, host: { id: userId } };
    const response = await saveBooking(bookingDTO);
    return response;
  };

  if (!bookings) return <div>Loading...</div>;
  return <ListingList onSaveBooking={onSaveBooking} listings={bookings} />;
}
