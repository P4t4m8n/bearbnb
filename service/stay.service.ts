import { SearchBY } from "@/model/stay.model";

export const getEmptyFilter = (): SearchBY => {
  return {
    name: "",
    dates: { start: null, end: null },
    priceRange: { start: 1, end: 10000 },
    location: "",
  };
};
