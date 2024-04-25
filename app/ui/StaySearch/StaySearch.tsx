import { ChangeEvent } from "react";
import { SearchSVG } from "../svgs/svgs";
import styles from "./StaySearch.module.scss";

export function StaySearch() {
  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log("ev:", ev);
  };

  return (
    <div className={styles.search}>
      <div className={styles.inputBtn}>
        <span>Where</span>
        <input
          placeholder="Search destinations"
          value=""
          onChange={handleSearch}
        />
      </div>
      <button className={styles.inputBtn}>
        <span>Check in</span>
        <p>Add dates</p>
      </button>
      <button className={styles.inputBtn}>
        <span>Check out</span>
        <p>Check out</p>
      </button>
      <button className={styles.inputBtn}>
        <span>Who</span>
        <p>Who</p>
      </button>
      <button className={styles.searchBtn}>
        <SearchSVG />
      </button>
    </div>
  );
}
