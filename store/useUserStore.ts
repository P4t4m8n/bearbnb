// store/useUserStore.js
import { UserSmall } from "@/model/stay.model";
import { create } from "zustand";

interface UserStore {
  user: UserSmall | null;
  setUser: (user: UserSmall | null) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
