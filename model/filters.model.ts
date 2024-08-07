import { BookingStatus } from "./booking.model";
import { GuestsModel } from "./guest.model";
import { LabelsType } from "./labels.type";

export interface FilterByModel {
  name?: string;
  host?: string;
  dates?: {
    start: Date | null;
    end: Date | null;
  };
  type?: string;
  bedroomsAmount?: number;
  totalBeds?: number;
  baths?: number;
  priceRange?: {
    start: number;
    end: number;
  };
  distance?: number;
  guests?: GuestsModel;
  amenities?: string[];
  location?: { lat: number; lng: number; city?: string };
  labels?: LabelsType[];
}

export interface SearchParamsModel {
  location?: string;
  distance?: string;
  startDate?: string;
  endDate?: string;
  guests?: string;
  amenities?: string;
  type?: string;
  priceRange?: string;
  bedroomsAmount?: string;
  totalBeds?: string;
  baths?: string;
  label?: string;
  host?: string;
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

  bedroomsAmount: number;
  totalBeds: number;
  baths: number;

  type: "AnyType" | "room" | "entireHome";
}

export interface BookingFilterModel {
  dateRange?: { startDate: Date; endDate: Date };
  status?: BookingStatus;
  hostId?: string;
  userId?: string;
  stayId?: string;
  _id?: string;
}
