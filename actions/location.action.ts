"use server";
import "server-only";
import { dbService } from "@/db/db.service";
import { LocationModel, LocationSchema } from "@/model/location.model";
import { locationValidate } from "@/db/dataValidation/validation";

export const saveLocation = async (
  location: LocationModel
): Promise<LocationModel> => {
  try {
    locationValidate.parse(location);

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
