"use client";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";
import FilterModal from "./FilterModal/FilterModal";
import { getEmptyFilter } from "@/service/stay.service";
import { useFilterStore } from "@/store/userFIlterStore";
import { useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LabelsType } from "@/model/labels.type";

export default function StayFilter() {
  const { filterBy, setFilterBy } = useFilterStore();
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const amanitas = useRef<string[]>([]);

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
      return;
    }
    params.set(name, value);
    replace(`${pathName}?${params.toString()}`);
  };

  const handleLabelCLick = (label: LabelsType) => {
    let check = filterBy.label === label;
    if (check) return;
    setFilterBy({ ...filterBy, label });
    params.set("label", label);
    replace(`${pathName}?${params.toString()}`);
  };

  const onClear = () => {
    setFilterBy(getEmptyFilter());
  };

  const onSubmit = () => {};
  return (
    <>
      <div className={styles.filter}>
        <IconList handleLabelClick={handleLabelCLick} />
        <FilterModal
          loading={loading}
          filterBy={filterBy}
          handleChange={handleChange}
          onClear={onClear}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}
