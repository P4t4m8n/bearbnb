"use client";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";
import FilterModal from "./FilterModal/FilterModal";
import { getEmptyFilter } from "@/service/stay.service";
import { useFilterStore } from "@/store/userFIlterStore";
import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { LabelsType } from "@/model/labels.type";

export default function StayFilter() {
  const { filterBy, setFilterBy } = useFilterStore();
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("ev:", ev);
  };

  const handleLabelCLick = (label: LabelsType) => {
    console.log("label:", label);
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
