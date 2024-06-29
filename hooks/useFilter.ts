import { FilterByModel } from "@/model/filters.model";
import { LabelsType } from "@/model/labels.type";
import { getEmptyFilter, queryIteratorParamToFilter } from "@/service/stay.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export const useFilter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const amanitas = useRef<string[]>([]);
  const filterBy = useRef<FilterByModel>(getEmptyFilter());
  const params = new URLSearchParams(searchParams);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { target } = ev;
    const { value, name, type } = target;

    if (type === "checkbox") {
      if (target.checked) {
        amanitas.current.push(value);
      } else {
        amanitas.current = amanitas.current.filter((item) => item !== value);
      }

      params.set(name, amanitas.current.join(","));
      replace(`${pathName}?${params.toString()}`);
    } else {
      params.set(name, value);
      replace(`${pathName}?${params.toString()}`);
    }
    filterBy.current = queryIteratorParamToFilter(params.entries());
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
