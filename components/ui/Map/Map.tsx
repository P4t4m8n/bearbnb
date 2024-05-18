"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./Map.module.scss";
import { getUserLocation } from "@/service/locations.service";
import { useEffect, useState } from "react";
import { LocationSmallModel } from "@/model/location.model";

export default function StayMap() {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const [location, setLocation] = useState<LocationSmallModel | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const userLocation = await getUserLocation();
    setLocation(userLocation);
  };

  const customIcon = {
    path: "M -40,-5 A 10,10 0 0,1 -30,-10 L 30,-10 A 10,10 0 0,1 40,-5 L 40,5 A 10,10 0 0,1 30,10 L -30,10 A 10,10 0 0,1 -40,5 Z",
    fillColor: "white",
    fillOpacity: 1,
    strokeWeight: 2,
    scale: 1,
  };

  if (!location) return;
  return (
    <section className={styles.mapCon}>
      <LoadScript googleMapsApiKey={key}>
        <GoogleMap
          mapContainerClassName={styles.mapCon}
          zoom={12}
          center={location}
        >
          <Marker label={"$235"} icon={customIcon} position={location}></Marker>
        </GoogleMap>
      </LoadScript>
    </section>
  );
}
