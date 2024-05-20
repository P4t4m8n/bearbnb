import { FilterByModel } from "@/model/filters.model";
import { getEmptyFilter } from "@/service/stay.service";
import { create } from "zustand";

interface FilterStore {
  filterBy: FilterByModel;
  setFilterBy: (filterBy: FilterByModel) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterBy: getEmptyFilter(),
  setFilterBy: (filterBy: FilterByModel) => set({ filterBy: filterBy }),
}));
