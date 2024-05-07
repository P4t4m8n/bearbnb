import { LocationSmall } from "@/model/stay.model";

//Calculate distance between two locations using Haversine formula
export const calculateDistance = (
  point1: LocationSmall,
  point2: LocationSmall
): number => {
  // Radius of the Earth in km
  const R = 6371;

  // Convert degrees to radians
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLon = ((point2.lng - point1.lng) * Math.PI) / 180;

  // Convert latitudes to radians
  const lat1 = (point1.lat * Math.PI) / 180;
  const lat2 = (point2.lat * Math.PI) / 180;

  // Apply the Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.floor(R * c); // Distance in km
};

export const parseCoordinates = (input: string): LocationSmall => {
  const regex = /lat:\s*([+-]?\d+(\.\d+)?),\s*lng:\s*([+-]?\d+(\.\d+)?)/;
  const match = input.match(regex);

  if (match) {
    return {
      lat: parseFloat(match[1]),
      lng: parseFloat(match[3]),
    };
  } else {
    console.error("Invalid string return default value");
    return { lat: -25.344, lng: 131.031 };
  }
};

export const getUserLocation = (): Promise<LocationSmall> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: LocationSmall = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Resolve the promise with the location
          resolve(location);
        },
        (error) => {
          console.error(error);
          // Reject the promise on error
          reject(new Error("Failed to retrieve location"));
        }
      );
    } else {
      console.error("Geolocation not supported");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};
