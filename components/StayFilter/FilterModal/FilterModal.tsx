"use client";
import styles from "./FilterModal.module.scss";
import { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { FilterSVG } from "../../svgs/svgs";
import { FilterByModel } from "@/model/filters.model";

interface Props {
  filterBy: FilterByModel;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  // loading: boolean;
  onClear: () => void;
  onSubmit: () => void;
}

export default function FilterModal({
  filterBy,
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
        <section ref={modelRef} className={styles.filterModal}>
          <header>
            <button>X</button>
            <h1>Filters</h1>
          </header>
          <section className={styles.container}>
            <div className={styles.type}>
              <h2>Type of place</h2>
              <p>Search rooms, entire homes , or any type of place</p>
              <div className={styles.typeRadio}>
                <input
                  onChange={handleChange}
                  type="radio"
                  name="type"
                  id="anyType"
                  value="AnyType"
                  hidden
                />
                <label htmlFor="anyType">Any type</label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name="type"
                  id="room"
                  value="room"
                  hidden
                />
                <label htmlFor="room">Room</label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name="type"
                  value="entireHome"
                  id="entireHome"
                  hidden
                />
                <label htmlFor="entireHome">Entire home</label>
              </div>
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
              <p>Bedrooms</p>
              <div>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="0"
                  type="radio"
                  id="anyBedrooms"
                ></input>
                <label htmlFor="anyBedrooms">Any</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="1"
                  type="radio"
                  id="1Bedroom"
                ></input>
                <label htmlFor="1Bedroom">1</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="2"
                  type="radio"
                  id="2Bedrooms"
                ></input>
                <label htmlFor="2Bedrooms">2</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="3"
                  type="radio"
                  id="3Bedrooms"
                ></input>
                <label htmlFor="3Bedrooms">3</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="4"
                  type="radio"
                  id="4Bedrooms"
                ></input>
                <label htmlFor="4Bedrooms">4</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="5"
                  type="radio"
                  id="5Bedrooms"
                ></input>
                <label htmlFor="5Bedrooms">5</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="6"
                  type="radio"
                  id="6Bedrooms"
                ></input>
                <label htmlFor="6Bedrooms">6</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="7"
                  type="radio"
                  id="7Bedrooms"
                ></input>
                <label htmlFor="7Bedrooms">7</label>
                <input
                  onChange={handleChange}
                  name="bedroomsAmount"
                  value="8"
                  type="radio"
                  id="8Bedrooms"
                ></input>
                <label htmlFor="8Bedrooms">8+</label>
              </div>
              <p>Beds</p>
              <div>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="0"
                  type="radio"
                  id="anyBeds"
                ></input>
                <label htmlFor="anyBeds">Any</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="1"
                  type="radio"
                  id="1Bed"
                ></input>
                <label htmlFor="1Bed">1</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="2"
                  type="radio"
                  id="2Beds"
                ></input>
                <label htmlFor="2Beds">2</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="3"
                  type="radio"
                  id="3Beds"
                ></input>
                <label htmlFor="3Beds">3</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="4"
                  type="radio"
                  id="4Beds"
                ></input>
                <label htmlFor="4Beds">4</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="5"
                  type="radio"
                  id="5Beds"
                ></input>
                <label htmlFor="5Beds">5</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="6"
                  type="radio"
                  id="6Beds"
                ></input>
                <label htmlFor="6Beds">6</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="7"
                  type="radio"
                  id="7Beds"
                ></input>
                <label htmlFor="7Beds">7</label>
                <input
                  onChange={handleChange}
                  name="totalBeds"
                  value="8"
                  type="radio"
                  id="8Beds"
                ></input>
                <label htmlFor="8Beds">8+</label>
              </div>
              <p>Bathrooms</p>
              <div>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="any"
                  type="radio"
                  id="anyBathrooms"
                ></input>
                <label htmlFor="anyBathrooms">Any</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="1"
                  type="radio"
                  id="1Bathroom"
                ></input>
                <label htmlFor="1Bathroom">1</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="2"
                  type="radio"
                  id="2Bathrooms"
                ></input>
                <label htmlFor="2Bathrooms">2</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="3"
                  type="radio"
                  id="3Bathrooms"
                ></input>
                <label htmlFor="3Bathrooms">3</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="4"
                  type="radio"
                  id="4Bathrooms"
                ></input>
                <label htmlFor="4Bathrooms">4</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="5"
                  type="radio"
                  id="5Bathrooms"
                ></input>
                <label htmlFor="5Bathrooms">5</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="6"
                  type="radio"
                  id="6Bathrooms"
                ></input>
                <label htmlFor="6Bathrooms">6</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="7"
                  type="radio"
                  id="7Bathrooms"
                ></input>
                <label htmlFor="7Bathrooms">7</label>
                <input
                  onChange={handleChange}
                  name="baths"
                  value="8"
                  type="radio"
                  id="8Bathrooms"
                ></input>
                <label htmlFor="8Bathrooms">8+</label>
              </div>
            </div>
            <div className={styles.amenities}>
              <h2>Amenities</h2>
              {/* <ul>
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
              </ul> */}
            </div>
          </section>
          <div className={styles.actions}>
            <button onClick={onClear}>Clear all</button>
            <button onClick={onSubmit}>Show places</button>
          </div>
        </section>
      )}
    </>
  );
}
