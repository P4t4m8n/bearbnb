'use server'

import { dbService } from "@/db/db.service";
import { AmenityModel, AmenitySmallModel } from "@/model/amenity.model";

export const getAmenities = async (): Promise<AmenityModel[]> => {
  try {
    const collection = await dbService.getCollection("amenities");
    const amenitiesData = await collection.find().toArray();

    const amenities = amenitiesData.map((amenity) => {
      return {
        _id: amenity._id.toString(),
        name: amenity.name || "Miscellaneous",
        path: amenity.path || "",
        viewBox: amenity.viewBox || "",
        category: amenity.category || "Miscellaneous",
      };
    });
    return amenities;
  } catch (error) {
    throw new Error(`Error while fetching amenities: ${error}`);
  }
};

export const getSmallAmenities = async (): Promise<AmenitySmallModel[]> => {
  try {
    const collection = await dbService.getCollection("amenities");
    const amenitiesData = await collection.find().toArray();

    const amenities = amenitiesData.map((amenity) => {
      return {
        _id: amenity._id.toString(),
        name: amenity.name || "Miscellaneous",
        category: amenity.category || "Miscellaneous",
      };
    });
    return amenities;
  } catch (error) {
    throw new Error(`Error while fetching amenities: ${error}`);
  }
};
