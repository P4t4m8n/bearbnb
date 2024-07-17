import { LocationModel, LocationModelKeys } from "@/model/location.model";
import styles from "./StayEditLocation.module.scss";
import StayMap from "@/components/Map/Map";
import { countries, getGeocodeAddress } from "@/service/locations.service";
import { ScrollBySVG } from "@/components/svgs/svgs";
import AddressSearchGoogle from "@/components/StaySearch/AddressSearch/AddressAutoComplete/AddressSearchGoogle";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useEffect } from "react";

interface Props {
  location: LocationModel;
  setLocation: (location: LocationModel) => void;
  stage: number;
  setStage: (stage: number) => void;
}
interface inputFields {
  name: LocationModelKeys;
  placeholder: string;
  type: string;
}
const libraries: Libraries = ["places"];

export default function StayEditLocation({
  location,
  setLocation,
  stage,
  setStage,
}: Props) {
  console.log("stage:", stage);
  console.log("location:", location);
  let { lat, lng, country } = location;

  const addressStr = `${location.streetAddress} ${
    location?.entrance ? location.entrance : ""
  } ${location.apt ? location.apt : ""} ${
    location.house ? location.house : ""
  } ${location.postalCode ? location.postalCode : ""} ${
    location.city ? location.city : ""
  } ${location.country}`;
  useEffect(() => {
    if (stage === 6) {
      const coords = getGeocodeAddress(addressStr).then((coords) => {
        setLocation({ ...location, lat: coords.lat, lng: coords.lng });
      });
    }
  }, [stage]);

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = ev.target;

    let newLocation;

    if (name === "country") {
      const [name, code] = value.split(" - ");
      newLocation = { ...location, country: name, countryCode: code };
    } else {
      newLocation = { ...location, [name]: value };
    }

    setLocation(newLocation);
  };

  const onSetLocation = (location: LocationModel) => {
    setStage(5);
    setLocation(location);
  };

  const inputFields: inputFields[] = [
    { name: "streetAddress", placeholder: "Street address", type: "text" },
    { name: "entrance", placeholder: "Entrance (if applicable)", type: "text" },
    {
      name: "apt",
      placeholder: "Apartment number (if applicable)",
      type: "text",
    },
    {
      name: "house",
      placeholder: "House number (if applicable)",
      type: "text",
    },
    { name: "postalCode", placeholder: "Postal Code", type: "text" },
    { name: "city", placeholder: "City", type: "text" },
  ];

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    libraries,
    id: "google-map-script",
  });

  return (
    <div className={styles.locationEdit}>
      <div className={styles.text}>
        <h1>
          {country ? "Confirm your address" : "Where's your place located"}?
        </h1>
        <p>
          {
            "Your address is only shared with guests after they’ve made a reservation."
          }
        </p>
      </div>
      {stage === 5 && (
        <form className={styles.confirmLocationForm}>
          <div className={styles.selectCon}>
            <div
              className={`${styles.formPlaceholder} ${
                location.country ? styles.formPlaceholderSmall : ""
              }`}
            >
              Country/region
            </div>
            <select
              name="country"
              value={`${location.country} - ${location.countryCode}`}
              onChange={handleChange}
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  value={`${country.name} - ${country.code}`}
                >
                  {country.name} - {country.code}
                </option>
              ))}
            </select>
            <ScrollBySVG />
          </div>
          {inputFields.map((field) => (
            <div className={styles.inputCon} key={field.name}>
              <div
                className={`${styles.formPlaceholder} ${
                  location[field.name] ? styles.formPlaceholderSmall : ""
                }`}
              >
                {field.placeholder}
              </div>
              <input
                type={field.type}
                name={field.name.toString()}
                value={location[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </form>
      )}
      {isLoaded && (
        <div
          className={`${styles.map} ${stage === 5 ? styles.mapConfirm : ""}`}
        >
          <StayMap location={{ lat, lng }} isLoaded={isLoaded} />
        </div>
      )}
      {stage != 5 && isLoaded && (
        <div className={styles.address}>
          <AddressSearchGoogle
            onSelect={onSetLocation}
            placeHolder={"Enter your address"}
            value={addressStr}
          />
        </div>
      )}
    </div>
  );
}
