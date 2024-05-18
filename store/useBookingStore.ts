import { BookingModel } from "@/model/booking.model";
import { getEmptyBooking } from "@/service/booking-service";
import { create } from "zustand";

interface BookingStore {
  booking: BookingModel;
  setBooking: (booking: BookingModel) => void;
}
export const useBookingStore = create<BookingStore>((set) => ({
  booking: getEmptyBooking(),
  setBooking: (booking: BookingModel) => set({ booking }),
}));
