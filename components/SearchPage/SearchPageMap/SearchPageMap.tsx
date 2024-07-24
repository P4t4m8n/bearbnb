"use client";

import { CoordsModel } from "@/model/location.model";
import styles from "./SearchPageMap.module.scss";
import { StaySmallModel } from "@/model/stay.model";
import { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "@/service/locations.service";
import SearchStayPreviewMarker from "./SearchStayPreviewMarker/SearchStayPreviewMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface Props {
  location: CoordsModel;
  stays: StaySmallModel[];
}

export default function SearchPageMap({ location, stays }: Props) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    libraries,
    id: "google-map-script",
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.setCenter(location);
      map.setZoom(13);
      setMap(map);
    },
    [location]
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      map.setCenter(location);
    }
  
  }, [location, map]);

  if (loadError) {
    console.error("Map Load Error:", loadError);
    return <div>Error loading map</div>;
  }

  

  return (
    <div className={styles.mapContainer}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {stays.map((stay) => (
            <SearchStayPreviewMarker key={stay._id} stay={stay} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}
