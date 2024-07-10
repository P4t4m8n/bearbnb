import { Amenity, AmenityTypes } from "./amenities.type";
export interface AmenitySmallModel {
  _id: string;
  name: Amenity;
  category: AmenityTypes;
}
export interface AmenityModel extends AmenitySmallModel {
  path: string;
  viewBox: string;
}

export interface GroupedAmenities {
  [category: string]: { name: Amenity; _id: string; isChecked: boolean }[];
}
