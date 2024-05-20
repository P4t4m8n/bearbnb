import { Amenity } from "./amenities.type";
import { LabelsType } from "./labels.type";

export interface FilterByModel {
  dates?: { start: Date | null; end: Date | null };
  name?: string;
  location?: string;
  priceRange?: { start: number; end: number };
  host?: string;
  type?: "Any type" | "Room" | "Entire home";
  bedrooms?: number;
  beds?: number;
  baths?: number;
  label?: LabelsType;
  amenities?: Amenity[];
}
