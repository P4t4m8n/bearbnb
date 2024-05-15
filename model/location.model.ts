import { StaySmallModel } from "./stay.model";

export interface LocationSmallModel {
  lat: number;
  lng: number;
}
export interface LocationModel extends LocationSmallModel {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  address: string;
  stay?: StaySmallModel;
}

export interface LocationAddressSmallModel {
  country: string;
  city: string;
}
