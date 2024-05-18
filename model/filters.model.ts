export interface SearchByModel {
  dates?: { start: Date | null; end: Date | null };
  name?: string;
  location?: string;
  priceRange?: { start: number; end: number };
  host?: string;
}
