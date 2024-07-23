"use client";
import { FilterByModel } from "@/model/filters.model";
import { GuestsModel } from "@/model/guest.model";
import { LabelsType } from "@/model/labels.type";
import { filterToSearchParams } from "@/service/filter.service";
import { getUserLocation } from "@/service/locations.service";
import { getEmptyFilter } from "@/service/stay.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export const useFilter = () => {
  const searchParams = useSearchParams();
  const [filterBy, setFilterBy] = useState<FilterByModel>(getEmptyFilter());
  const params = new URLSearchParams(searchParams);
  const isStart = useRef<boolean>(true);
  const router = useRouter();

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = ev;
    const { value, name, type } = target;
  

    if (type === "checkbox") {
      let amenities: string[] = [];
      if (target.checked) {
        amenities = [...filterBy.amenities!, value];
      } else {
        amenities = filterBy.amenities!.filter((item) => item !== value);
      }
      setFilterBy((prev) => ({ ...prev, amenities }));
    } else if (type === "range") {
      const priceRange = {
        start: +value,
        end: filterBy.priceRange?.end!,
      };
      setFilterBy((prev) => ({ ...prev, priceRange }));
    } else {
      setFilterBy((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLabelClick = (label: LabelsType) => {
    const tempLabels = filterBy.labels || [];

    const idx = tempLabels.findIndex((l) => l === label);
    if (idx < 0) {
      tempLabels?.splice(idx, 1);
    } else {
      tempLabels?.push(label);
    }
    setFilterBy((prevFilter) => ({ ...prevFilter, labels: tempLabels }));
  };

  const onClear = () => {
    setFilterBy(getEmptyFilter());
  };

  const submit = async (ev?: React.MouseEvent<HTMLButtonElement>) => {
    if (ev) ev.preventDefault();

    if (filterBy.location?.lat === 0 && filterBy.location?.lng === 0) {
      const location = await getUserLocation();
      filterToSearchParams({ ...filterBy, location }, params);
    } else {
      filterToSearchParams(filterBy, params);
    }
    const url = `/search?${params.toString()}`;

    router.push(url);
  };

  const handleDate = (date: Date | null) => {
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
      if (isStart.current) {
        // Setting start date and potentially clearing end date if it's before the new start
        dates.start = date;
        if (dates.end && date >= dates.end) {
          dates.end = null;
        }
        isStart.current = false;
      } else {
        // Setting end date and potentially correcting start date if it's after the new end
        if (dates.start && date <= dates.start) {
          dates = { start: date, end: null };
        } else {
          dates.end = date;
        }
        isStart.current = true;
      }
    }
    setFilterBy((prevFilter) => ({ ...prevFilter, dates }));
  };

  const clearDates = () => {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      dates: { start: null, end: null },
    }));
  };

  const handleLocation = ({ lat, lng }: { lat: number; lng: number }) => {
    setFilterBy((prevFilter) => ({
      ...prevFilter,
      location: { lat, lng },
    }));
  };

  const handleGuests = (guests: GuestsModel) => {
    setFilterBy((prevFilter) => ({ ...prevFilter, guests }));
  };

  return {
    filterBy,
    handleChange,
    handleLabelClick,
    onClear,
    submit,
    handleDate,
    clearDates,
    handleLocation,
    handleGuests,
  };
};
