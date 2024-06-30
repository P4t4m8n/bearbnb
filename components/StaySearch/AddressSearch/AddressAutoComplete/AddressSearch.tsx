'use client'
import { debounce } from "@/util/debounce";
import styles from "./AddressSearch.module.scss";
import { useCallback, useState } from "react";
import { SuggestionPin } from "@/components/svgs/svgs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AddressSearch() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    {
      display_name: string;
      lat: number;
      lon: number;
      place_id: string;
    }[]
  >([]);

  // Define fetchSuggestions function
  const fetchSuggestions = async (value: string) => {
    if (value.length > 2) {
      const response = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=pk.91f41d653bda76783c768bb8f0b358d3&q=${encodeURIComponent(
          value
        )}&limit=5&format=json`
      );
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  // Memoize the debounced fetchSuggestions function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 3000),
    []
  );

  // Handle input change event
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value);
  };

  const handleSuggestionClick = ({
    lat,
    lon: lng,
  }: {
    display_name: string;
    lat: number;
    lon: number;
  }) => {
    params.set("location", `${lat},${lng}`);
    replace(`${pathName}?${params.toString()}`);
    setSuggestions([]);
  };

  return (
    <div className={`${styles.addressSearch}`}>
      <span>Where</span>
      <input
        placeholder="Search destinations"
        value={query}
        onChange={handleInputChange}
      />

      {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <SuggestionPin />
              <h3>{suggestion.display_name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
