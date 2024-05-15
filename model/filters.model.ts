export interface SearchByModel {
  dates?: { start?: Date; end?: Date };
  name?: string;
  location?: string;
  priceRange?: { start: number; end: number };
  host?: string;
}
