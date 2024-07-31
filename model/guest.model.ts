export interface GuestsModel {
  adults: number;
  children: number;
  infants: number;
}

export type GuestsKey = keyof GuestsModel ;
