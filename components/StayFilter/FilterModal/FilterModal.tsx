"use client";
import styles from "./FilterModal.module.scss";
import { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { FilterSVG } from "../../svgs/svgs";
import { FilterByModel } from "@/model/filters.model";
import { AmenitySmallModel } from "@/model/amenity.model";
import AmenitiesFilter from "./AmenitiesFilter/AmenitiesFilter";
import RoomBedsFilter from "./RoomsBedsFilter/RoomBedsFilter";

interface Props {
  filterBy: FilterByModel;
  amenities: AmenitySmallModel[];
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  submit: () => void;
}

const typeOptions = [
  { id: "anyType", value: "AnyType", label: "Any type" },
  { id: "room", value: "room", label: "Room" },
  { id: "entireHome", value: "entireHome", label: "Entire home" },
];

const bedroomsOptions = Array.from({ length: 9 }, (_, i) => ({
  id: i === 0 ? "anyBedrooms" : `${i}Bedrooms`,
  value: i === 0 ? "0" : `${i}`,
  label: i === 0 ? "Any" : `${i}`,
}));

const bedsOptions = Array.from({ length: 9 }, (_, i) => ({
  id: i === 0 ? "anyBeds" : `${i}Beds`,
  value: i === 0 ? "0" : `${i}`,
  label: i === 0 ? "Any" : `${i}`,
}));

const bathroomsOptions = Array.from({ length: 9 }, (_, i) => ({
  id: i === 0 ? "anyBathrooms" : `${i}Bathrooms`,
  value: i === 0 ? "0" : `${i}`,
  label: i === 0 ? "Any" : `${i}`,
}));

export default function FilterModal({
  filterBy,
  amenities,
  handleChange,
  onClear,
  submit,
}: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useModal(modelRef, null);

  const onSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsFiltersOpen(false);
    submit();
  };

  return (
    <div>
      <button
        onClick={() => setIsFiltersOpen(true)}
        className={styles.filterBtn}
      >
        <FilterSVG />
        <p>Filters</p>
      </button>

      {isFiltersOpen && (
        <section ref={modelRef} className={styles.filterModal}>
          <header>
            <button onClick={() => setIsFiltersOpen(false)}>X</button>
            <h1>Filters</h1>
          </header>

          <section className={styles.container}>
            <div className={styles.type}>
              <h2>Type of place</h2>
              <p>Search rooms, entire homes , or any type of place</p>
              <ul className={styles.typeRadio}>
                {typeOptions.map((option) => (
                  <li key={option.id}>
                    <input
                      onChange={handleChange}
                      type="radio"
                      name="type"
                      id={option.id}
                      value={option.value}
                      hidden
                      checked={filterBy.type === option.value}
                    />
                    <label htmlFor={option.id}>{option.label}</label>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.priceRange}>
              <h2>Price range</h2>
              <p>Nightly prices including fees and taxes</p>
              <input
                name="priceRange"
                onChange={handleChange}
                type="range"
                min="0"
                max="2400"
                step="1"
                value={filterBy.priceRange?.start || 1}
              />
              <div className={styles.price}>
                <div>
                  <h6>Minimum</h6>
                  <h3>{filterBy.priceRange?.start || 1}</h3>
                </div>
                <span>-</span>
                <div>
                  <h6>Maximum</h6>
                  <h3>{filterBy.priceRange?.end || 2400}</h3>
                </div>
              </div>
            </div>

            <div className={styles.rooms}>
              <h2>Rooms and beds</h2>
              <RoomBedsFilter
                options={bedroomsOptions}
                category="Bedrooms"
                name="bedroomsAmount"
                handleChange={handleChange}
                amount={filterBy.bedroomsAmount || 0}
              />
              <RoomBedsFilter
                options={bedsOptions}
                category="Beds"
                name="totalBeds"
                handleChange={handleChange}
                amount={filterBy.totalBeds || 0}
              />
              <RoomBedsFilter
                options={bathroomsOptions}
                category="Bathrooms"
                name="baths"
                handleChange={handleChange}
                amount={filterBy.baths || 0}
              />
            </div>

            <AmenitiesFilter
              amenities={amenities}
              checkedAmenities={filterBy.amenities || []}
              handleChange={handleChange}
            />
          </section>

          <div className={styles.actions}>
            <button onClick={onClear}>Clear all</button>
            <button onClick={onSubmit}>Show places</button>
          </div>
        </section>
      )}
    </div>
  );
}
