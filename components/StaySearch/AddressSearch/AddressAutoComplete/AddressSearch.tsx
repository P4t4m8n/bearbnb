"use client";
import { debounce } from "@/util/debounce";
import styles from "./AddressSearch.module.scss";
import { useCallback, useRef, useState } from "react";
import { SuggestionPin } from "@/components/svgs/svgs";
import { useModal } from "@/hooks/useModal";

interface Props {
  handleLocation: ({ lat, lng }: { lat: number; lng: number }) => void;
}

export default function AddressSearch({ handleLocation }: Props) {
  const [query, setQuery] = useState("");
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useModal(suggestionsRef);
  const suggestions = useRef<
    {
      display_name: string;
      lat: number;
      lng: number;
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
      suggestions.current = data;
      setIsSuggestionsOpen(true);
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
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setQuery(capitalizedValue);
    debouncedFetchSuggestions(capitalizedValue);
  };

  const handleSuggestionClick = ({
    lat,
    lng,
    display_name,
  }: {
    lat: number;
    lng: number;
    display_name: string;
  }) => {
    const capitalizedValue =
      display_name.charAt(0).toUpperCase() +
      display_name.slice(1).split(",")[0];

    setIsSuggestionsOpen(false);
    setQuery(capitalizedValue);
    handleLocation({ lat, lng });
    suggestions.current = [];
  };

  return (
    <div className={`${styles.addressSearch}`}>
      <span>Where</span>
      <input
        placeholder="Search destinations"
        value={query}
        onChange={handleInputChange}
      />

      {isSuggestionsOpen && (
        <ul ref={suggestionsRef} className={styles.suggestions}>
          {suggestions.current.map((suggestion) => (
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
