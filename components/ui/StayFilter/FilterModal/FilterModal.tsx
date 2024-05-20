"use client";
import styles from "./FilterModal.module.scss";
import { Amenities } from "@prisma/client";
import { useRef } from "react";
import { useModal } from "@/components/hooks/useModal";
import { FilterSVG } from "../../svgs/svgs";
import { FilterByModel } from "@/model/filters.model";

interface Props {
  filterBy: FilterByModel;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  onClear: () => void;
  onSubmit: () => void;
}

export default function FilterModal({
  filterBy,
  loading,
  handleChange,
  onClear,
  onSubmit,
}: Props) {
  const modelRef = useRef<HTMLFormElement>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useModal(modelRef, null);

  return (
    <>
      <button
        onClick={() => setIsFiltersOpen(true)}
        className={styles.filterBtn}
      >
        <FilterSVG />
        <p>Filters</p>
      </button>
      {isFiltersOpen && (
        <form ref={modelRef} className={styles.filterModal}>
          <div className={styles.type}>
            <h2>Type of place</h2>
            <p>Search rooms, entire homes , or any type of place</p>
            <div className={styles.actions}>
              <input
                onChange={handleChange}
                type="radio"
                name="type"
                value="Any type"
              />
              <input
                onChange={handleChange}
                type="radio"
                name="type"
                value="Room"
              />
              <input
                onChange={handleChange}
                type="radio"
                name="type"
                value="Entire home"
              />
            </div>
          </div>
          <div className={styles.priceRange}>
            <h2>Price range</h2>
            <p>Nightly prices including fees and taxes</p>
            <input type="range" min="0" max="2400" step="1" />
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
            <h3>Bedrooms</h3>
            <div>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="any"
                type="radio"
              >
                Any
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="1"
                type="radio"
              >
                1
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="2"
                type="radio"
              >
                2
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="3"
                type="radio"
              >
                3
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="4"
                type="radio"
              >
                4
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="5"
                type="radio"
              >
                5
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="6"
                type="radio"
              >
                6
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="7"
                type="radio"
              >
                7
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="8"
                type="radio"
              >
                8+
              </input>
            </div>
            <h3>Beds</h3>
            <div>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="any"
                type="radio"
              >
                Any
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="1"
                type="radio"
              >
                1
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="2"
                type="radio"
              >
                2
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="3"
                type="radio"
              >
                3
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="4"
                type="radio"
              >
                4
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="5"
                type="radio"
              >
                5
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="6"
                type="radio"
              >
                6
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="7"
                type="radio"
              >
                7
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="8"
                type="radio"
              >
                8+
              </input>
            </div>
            <h3>Bathrooms</h3>
            <div>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="any"
                type="radio"
              >
                Any
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="1"
                type="radio"
              >
                1
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="2"
                type="radio"
              >
                2
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="3"
                type="radio"
              >
                3
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="4"
                type="radio"
              >
                4
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="5"
                type="radio"
              >
                5
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="6"
                type="radio"
              >
                6
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="7"
                type="radio"
              >
                7
              </input>
              <input
                onChange={handleChange}
                name="bedrooms"
                value="8"
                type="radio"
              >
                8+
              </input>
            </div>
          </div>
          <div className={styles.amenities}>
            <h2>Amenities</h2>
            <ul>
              {Object.keys(Amenities)
                .filter((key) => isNaN(Number(key)))
                .map((amenity, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      value={amenity}
                      name="amenities"
                    />
                    {amenity}
                  </label>
                ))}
            </ul>
          </div>
          <div className={styles.actions}>
            <button disabled={loading} onClick={onClear}>
              Clear all
            </button>
            <button disabled={loading} onClick={onSubmit}>
              Show places
            </button>
          </div>
        </form>
      )}
    </>
  );
}
