import { Amenity } from "./amenities.type";
import { LabelsType } from "./labels.type";
import { LocationSmallModel } from "./location.model";

export type Type = "AnyType" | "room" | "entireHome";
export interface FilterByModel {
  dates?: { start: Date | null; end: Date | null };
  name?: string;
  location?: { lat: number; lng: number; radius?: number };
  priceRange?: { start: number; end: number };
  host?: string;
  type?: Type;
  bedroomsAmount?: number;
  totalBeds?: number;
  baths?: number;
  label?: LabelsType;
  amenities?: Amenity[];
}

export interface SearchParamsModel {
  startDate: string;
  endDate: string;
  name: string;
  label: LabelsType;
  type: Type;
  bedroomsAmount: number;
  totalBeds: number;
  baths: number;
  amenities: string;
  priceRange: string;
  location: string;
}

export interface FilterLocationModel {}
