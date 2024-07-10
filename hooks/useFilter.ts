"use client";
import { FilterByModel } from "@/model/filters.model";
import { LabelsType } from "@/model/labels.type";
import { filterToSearchParams } from "@/service/filter.service";
import { getUserLocation } from "@/service/locations.service";
import { getEmptyFilter } from "@/service/stay.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export const useFilter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [filterBy, setFilterBy] = useState<FilterByModel>(getEmptyFilter());
  const params = new URLSearchParams(searchParams);

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
    const paramsLabel = params.get("label");
    const labels = paramsLabel?.split(",");
    const idx = labels?.findIndex((item) => item === label);
    if (idx && idx > -1) labels?.splice(idx, 1);
    else labels?.push(label);
    params.set("label", label);
    replace(`${pathName}?${params.toString()}`);
  };

  const onClear = () => {
    params.forEach((_, key) => params.delete(key));
    replace(`${pathName}?${params.toString()}`);

    setFilterBy(getEmptyFilter());
  };

  const submit = async () => {
    if (filterBy.location?.lat === 0 && filterBy.location?.lng === 0) {
      const location = await getUserLocation();
      console.log("location:", location)
      const _params = filterToSearchParams({ ...filterBy, location }, params);
    } else {
      const _params = filterToSearchParams(filterBy, params);
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return { handleChange, handleLabelClick, onClear, filterBy, submit };
};
