import { GuestsModel } from "./guest.model";

export interface FilterByModel {
  name?: string;
  host?: string;
  dates?: {
    start?: Date | null;
    end?: Date | null;
  };
  label?: string;
  type?: string;
  bedroomsAmount?: number;
  totalBeds?: number;
  baths?: number;
  priceRange?: {
    start: number;
    end: number;
  };
  amenities?: string[];
  location?: {};
}

export interface SearchParamsModel {
  location: string;
  distance?: string;
  startDate?: string;
  endDate?: string;
  guests: string;
}

export interface SearchParamsObject {
  location?: { lat: number; lon: number };
  distance?: number;
  dates?: {
    start: Date | null;
    end: Date | null;
  };
  guests?: GuestsModel;
  priceRange?: {
    start: number;
    end: number;
  };
  amenities?: string[];
  rooms?: {
    bedroomsAmount: number;
    totalBeds: number;
    baths: number;
  };
  type: "AnyType" | "room" | "entireHome";
}
