import { useEffect, useRef, useState } from "react";
import { LocationModel } from "@/model/location.model";
import { useModal } from "@/hooks/useModal";
import styles from "./AddressSearch.module.scss";
import { SuggestionPin } from "@/components/svgs/svgs";

interface Props {
  onSelect: (location: LocationModel) => void;
  placeHolder?: string;
  value?: string;
}

export default function AddressSearch({
  onSelect,
  placeHolder,
  value,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useModal(suggestionsRef);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

  const [suggestions, setSuggestions] = useState<
    { description: string; place_id: string }[]
  >([]);

  useEffect(() => {
    if (!inputRef.current) return;

    autocompleteServiceRef.current =
      new google.maps.places.AutocompleteService();
    placesServiceRef.current = new google.maps.places.PlacesService(
      inputRef.current
    );
  }, []);

  const handleInputChange = () => {
    if (!inputRef.current || !autocompleteServiceRef.current) return;

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: inputRef.current.value,
        types: ["address"],
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(
            predictions.map((prediction) => ({
              description: prediction.description,
              place_id: prediction.place_id,
            }))
          );
          setIsSuggestionsOpen(true);
        } else {
          console.error("Autocomplete failed with status:", status);
        }
      }
    );
  };

  const handleSuggestionClick = (placeId: string) => {
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId,
        fields: ["geometry", "address_components"],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const location: LocationModel = {
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            country:
              place.address_components?.find((component) =>
                component.types.includes("country")
              )?.long_name || "",
            countryCode:
              place.address_components?.find((component) =>
                component.types.includes("country")
              )?.short_name || "",
            city:
              place.address_components?.find(
                (component) =>
                  component.types.includes("locality") ||
                  component.types.includes("administrative_area_level_1")
              )?.long_name || "",
            streetAddress: `${
              place.address_components?.find((component) =>
                component.types.includes("route")
              )?.long_name || ""
            } ${
              place.address_components?.find((component) =>
                component.types.includes("street_number")
              )?.long_name || ""
            }`,
            postalCode:
              place.address_components?.find((component) =>
                component.types.includes("postal_code")
              )?.long_name || "",
          };
          onSelect(location);
          setIsSuggestionsOpen(false);
        } else {
          console.error("Place details failed with status:", status);
        }
      }
    );
  };


  return (
    <div className={styles.addressSearch}>
      {!value && (
        <input
          ref={inputRef}
          type="text"
          placeholder={placeHolder || "Enter an address"}
          onChange={handleInputChange}
        />
      )}
      {value && (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
        />
      )}
      {isSuggestionsOpen && (
        <ul ref={suggestionsRef} className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion.place_id)}
            >
              <SuggestionPin />
              <h3>{suggestion.description}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
