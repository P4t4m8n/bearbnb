export interface SvgIconModel {
  path: string;
  viewBox: string;
}

export const SvgsNameTypes = [
  "door",
  "calendar",
  "key",
  "house",
  "sharedHouse",
  "placeholder",
  "car",
  "message",
] as const;
export type SvgsNameTypes = (typeof SvgsNameTypes)[number];
