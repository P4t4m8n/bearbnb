import { UserModel } from "@/model/user.model";
import { create } from "zustand";

interface UserStore {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
