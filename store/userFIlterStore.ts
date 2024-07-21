import { create } from "zustand";
import { FilterByModel } from "@/model/filters.model";
import { GuestsModel } from "@/model/guest.model";
import { LabelsType } from "@/model/labels.type";
import { getEmptyFilter } from "@/service/stay.service";
import { LocationModel } from "@/model/location.model";

interface FilterState {
  filterBy: FilterByModel;
  isStart: boolean;
  setFilterBy: (filterBy: FilterByModel) => void;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleLabelClick: (label: LabelsType) => void;
  onClear: () => void;
  handleDate: (date: Date | null) => void;
  clearDates: () => void;
  handleLocation: (location: LocationModel) => void;
  handleGuests: (guests: GuestsModel) => void;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  filterBy: getEmptyFilter(false),
  isStart: true,
  setFilterBy: (filterBy) => set({ filterBy }),
  handleChange: (ev) => {
    const { target } = ev;
    const { value, name, type } = target;
    const { filterBy } = get();

    if (type === "checkbox") {
      let amenities: string[] = [];
      if (target.checked) {
        amenities = [...filterBy.amenities!, value];
      } else {
        amenities = filterBy.amenities!.filter((item) => item !== value);
      }
      set({ filterBy: { ...filterBy, amenities } });
    } else if (type === "range") {
      const priceRange = {
        start: +value,
        end: filterBy.priceRange?.end!,
      };
      set({ filterBy: { ...filterBy, priceRange } });
    } else {
      set({ filterBy: { ...filterBy, [name]: value } });
    }
  },

  handleLabelClick: (label) => {
    const { filterBy } = get();
    const tempLabels = filterBy.labels || [];

    const idx = tempLabels.findIndex((l) => l === label);
    if (idx < 0) {
      tempLabels.push(label);
    } else {
      tempLabels.splice(idx, 1);
    }
    set({ filterBy: { ...filterBy, labels: tempLabels } });
  },

  onClear: () => {
    set({ filterBy: getEmptyFilter() });
  },

  handleDate: (date) => {
    const { filterBy, isStart } = get();
    let dates: {
      start: Date | null;
      end: Date | null;
    } = {
      start: filterBy.dates?.start || null,
      end: filterBy.dates?.end || null,
    };

    if (!date) {
      dates = { start: null, end: null };
    } else {
      if (isStart) {
        dates.start = date;
        if (dates.end && date >= dates.end) {
          dates.end = null;
        }
        set({ isStart: false });
      } else {
        if (dates.start && date <= dates.start) {
          dates = { start: date, end: null };
        } else {
          dates.end = date;
        }
        set({ isStart: true });
      }
    }
    set({ filterBy: { ...filterBy, dates } });
  },

  clearDates: () => {
    set({
      filterBy: {
        ...get().filterBy,
        dates: { start: null, end: null },
      },
    });
  },

  handleLocation: (location) => {
    set({
      filterBy: {
        ...get().filterBy,
        location: { lat: location.lat, lng: location.lng, city: location.city },
      },
    });
  },

  handleGuests: (guests) => {
    set({
      filterBy: {
        ...get().filterBy,
        guests,
      },
    });
  },
}));
