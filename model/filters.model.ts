export interface FilterByModel {
  name?: string;
  host?: string;
  dates?: {
    start?: Date;
    end?: Date;
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

}
