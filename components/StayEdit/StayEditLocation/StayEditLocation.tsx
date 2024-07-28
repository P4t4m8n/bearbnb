import { LocationModel, LocationModelKeys } from "@/model/location.model";
import styles from "./StayEditLocation.module.scss";
import StayMap from "@/components/Map/Map";
import {
  countries,
  getGeocodeAddress,
  libraries,
  locationInputFields,
  parseLocationIntoString,
} from "@/service/locations.service";
import { AnimatedLogoSVG, ScrollBySVG } from "@/components/svgs/svgs";
import { useJsApiLoader } from "@react-google-maps/api";
import { ChangeEvent, useEffect, useMemo } from "react";
import AddressSearch from "@/components/Header/StaySearch/AddressSearch/AddressAutoComplete/AddressSearch";
import { handleError } from "@/service/util.service";

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

export default function StayEditLocation({
  location,
  setLocation,
  stage,
  setStage,
}: Props) {
  let { lat, lng, country } = location;

  const addressStr = useMemo(
    () => parseLocationIntoString(location),
    [location]
  );
  const inputFields: inputFields[] = useMemo(() => locationInputFields, []);

  useEffect(() => {
    if (stage === 6) {
      setLocationFromGeocode();
    }
  }, [stage, addressStr]);

  const setLocationFromGeocode = async () => {
    try {
      const coords = await getGeocodeAddress(addressStr);
      setLocation({ ...location, lat: coords.lat, lng: coords.lng });
    } catch (error) {
      handleError(`Failed to get geocode address: ${error}`);
    }
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    libraries,
    id: "google-map-script",
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, please try again later</div>;
  }

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
          {stage != 5 && isLoaded && (
            <section className={styles.address}>
              <AddressSearch
                onSelect={onSetLocation}
                placeHolder={"Enter your address"}
                value={location.streetAddress ? addressStr : ""}
              />
            </section>
          )}
        </div>
      )}

      {!isLoaded && <AnimatedLogoSVG />}
    </div>
  );
}
