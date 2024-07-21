import { z } from "zod";
import { dbService } from "@/db/db.service";
import { LocationModel, LocationSchema } from "@/model/location.model";

export const LocationValidate = z.object({
  _id: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  country: z.string(),
  city: z.string(),
  countryCode: z.string(),
  streetAddress: z.string(),
  postalCode: z.string().optional(),
  entrance: z.string().optional(),
  apt: z.string().optional(),
  house: z.string().optional(),
});

export const saveLocation = async (
  location: LocationModel
): Promise<LocationModel> => {
  try {
    LocationValidate.parse(location);

    const locationToSave: LocationSchema = {
      country: location.country,
      countryCode: location.countryCode,
      city: location.city,
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      entrance: location.entrance,
      apt: location.apt,
      house: location.house,
      location: {
        type: "Point",
        coordinates: [location.lat, location.lng],
      },
    };

    const collection = await dbService.getCollection("locations");
    const result = await collection.insertOne(locationToSave);

    return {
      ...location,
      _id: result.insertedId.toString(),
    };
  } catch (error) {
    throw new Error(`Failed to save location: ${error}`);
  }
};
