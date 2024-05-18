import { UserSmallModel } from "@/model/user.model";
import { create } from "zustand";

interface UserStore {
  user: UserSmallModel | null;
  setUser: (user: UserSmallModel | null) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
