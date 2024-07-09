"use client";
import { FilterByModel } from "@/model/filters.model";
import { LabelsType } from "@/model/labels.type";
import {
  getEmptyFilter,
  queryIteratorParamToFilter,
} from "@/service/stay.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { start } from "repl";
import { set } from "zod";

export const useFilter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [filterBy, setFilterBy] = useState<FilterByModel>(getEmptyFilter());
  const params = new URLSearchParams(searchParams);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = ev;
    const { value, name, type } = target;
    console.log("type:", type);

    if (type === "checkbox") {
      let amanitas: string[] = [];
      if (target.checked) {
        amanitas = [...filterBy.amenities!, value];
        setFilterBy((prev) => ({ ...prev, amanitas }));
      } else {
        amanitas = filterBy.amenities!.filter((item) => item !== value);
      }
      setFilterBy((prev) => ({ ...prev, amanitas }));

      // params.set(name, amanitas.current.join(","));
      // replace(`${pathName}?${params.toString()}`);
    } else if (type === "range") {
      const priceRange = {
        start: +value,
        end: filterBy.priceRange?.end!,
      };
      setFilterBy((prev) => ({ ...prev, priceRange }));
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
    params.forEach((_, key) => {
      params.delete(key);
    });
    replace(`${pathName}?`);
  };

  return { handleChange, handleLabelClick, onClear, filterBy };
};
