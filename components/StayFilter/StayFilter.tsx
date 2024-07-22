"use client";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";
import FilterModal from "./FilterModal/FilterModal";
import { useFilter } from "@/hooks/useFilter";
import { AmenitySmallModel } from "@/model/amenity.model";

interface Props {
  amenities: AmenitySmallModel[];
  isActive: boolean;
}
export default function StayFilter({ amenities, isActive }: Props) {
  const { handleChange, handleLabelClick, filterBy, onClear, submit } =
    useFilter();

  const filterClass = `${styles.filter} ${isActive ? styles.scroll : ""}`;
  return (
   
      <div className={filterClass}>
        <IconList handleLabelClick={handleLabelClick} />
        <FilterModal
          filterBy={filterBy}
          handleChange={handleChange}
          onClear={onClear}
          submit={submit}
          amenities={amenities}
        />
      </div>
   
  );
}
