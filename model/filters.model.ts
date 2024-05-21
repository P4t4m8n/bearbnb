import { Amenity } from "./amenities.type";
import { LabelsType } from "./labels.type";

export type Type = "AnyType" | "room" | "entireHome";
export interface FilterByModel {
  dates?: { start: Date | null; end: Date | null };
  name?: string;
  location?: string;
  priceRange?: { start: number; end: number };
  host?: string;
  type?: Type;
  bedroomsAmount?: number;
  totalBeds?: number;
  baths?: number;
  label?: LabelsType;
  amenities?: Amenity[];
}
