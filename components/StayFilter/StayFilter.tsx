"use client";
import IconList from "./IconList/IconList";
import styles from "./StayFilter.module.scss";
import FilterModal from "./FilterModal/FilterModal";
import { useFilter } from "@/hooks/useFilter";
import { AmenitySmallModel } from "@/model/amenity.model";

interface Props {
  amenities: AmenitySmallModel[];
}
export default function StayFilter({ amenities }: Props) {
  const { handleChange, handleLabelClick, filterBy, onClear, submit } =
    useFilter();

  return (
    <>
      <div className={styles.filter}>
        <IconList handleLabelClick={handleLabelClick} />
        <FilterModal
          filterBy={filterBy}
          handleChange={handleChange}
          onClear={onClear}
          submit={submit}
          amenities={amenities}
        />
      </div>
    </>
  );
}
