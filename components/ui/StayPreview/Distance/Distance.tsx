"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  calculateDistance,
  getUserLocation,
  parseCoordinates,
} from "@/service/locations.service";
import { LocationSmallModel } from "@/model/location.model";

interface Props {
  location: LocationSmallModel;
}

export default function Distance({ location }: Props) {
  const params = useParams();
  const [anchorLocation, setAnchorLocation] = useState<
  LocationSmallModel | undefined
  >();

  useEffect(() => {
    async function fetchUserLocation() {
      if (params.location) {
        // Parse coordinates from URL if available
        const parsedLocation = parseCoordinates(params.location as string);
        setAnchorLocation(parsedLocation);
      } else {
        // Otherwise, try to get the user's current location
        try {
          const userLocation = await getUserLocation();
          setAnchorLocation(userLocation);
        } catch (error) {
          console.error("Error fetching user location:", error);
          // Set a default location or handle the error appropriately
          setAnchorLocation({ lat: -25.344, lng: 131.031 }); // Default location
        }
      }
    }

    fetchUserLocation();
  }, [params.location]); 

  const distance = anchorLocation
    ? calculateDistance(anchorLocation, location)
    : "Loading...";

  return <h6>{distance} kilometers away</h6>;
}
