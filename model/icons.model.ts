export interface SvgIconModel {
  path: string;
  viewBox: string;
}

export const SvgsNameTypes = ["door", "calendar", "key", "house", "sharedHouse"] as const;
export type SvgsNameTypes = (typeof SvgsNameTypes)[number];