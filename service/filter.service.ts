import { FilterByModel } from "@/model/filters.model";

export const filterToSearchParams = (
  filterBy: FilterByModel,
  params: URLSearchParams
): URLSearchParams => {
  if (filterBy.location) {
    params.set("location", `${filterBy.location.lat},${filterBy.location.lng}`);
  }

  if (filterBy.dates) {
    if (filterBy.dates.start) {
      params.set(
        "startDate",
        filterBy.dates.start.toISOString().substring(0, 10)
      );
    }
    if (filterBy.dates.end) {
      params.set("endDate", filterBy.dates.end.toISOString().substring(0, 10));
    }
  }

  if (filterBy.guests) {
    params.set("guests", JSON.stringify(filterBy.guests));
  }

  if (filterBy.amenities) {
    params.set("amenities", filterBy.amenities.join(","));
  }

  if (filterBy.type) {
    params.set("type", filterBy.type);
  }

  if (filterBy.priceRange) {
    params.set(
      "priceRange",
      `${filterBy.priceRange.start},${filterBy.priceRange.end}`
    );
  }

  if (filterBy.bedroomsAmount) {
    params.set("bedroomsAmount", filterBy.bedroomsAmount.toString());
  }

  if (filterBy.totalBeds) {
    params.set("totalBeds", filterBy.totalBeds.toString());
  }

  if (filterBy.baths) {
    params.set("baths", filterBy.baths.toString());
  }

  if (filterBy.labels) {
    params.set("labels", filterBy.labels.join(","));
  }

  return params;
};
