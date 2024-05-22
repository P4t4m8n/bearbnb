"use client";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";
import FilterModal from "./FilterModal/FilterModal";
import { useState } from "react";
import { useFilter } from "@/components/hooks/useFilter";

export default function StayFilter() {
  const { handleChange, handleLabelClick, filterBy, onClear } = useFilter();

  const onSubmit = () => {};
  return (
    <>
      <div className={styles.filter}>
        <IconList handleLabelClick={handleLabelClick} />
        <FilterModal
          filterBy={filterBy.current}
          handleChange={handleChange}
          onClear={onClear}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}
