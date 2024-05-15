import { StaySmallModel } from "./stay.model";
import { UserSmallModel } from "./user.model";

export interface ReviewModel {
  id: string;
  text: string;
  rate: number;
  userId: string;
  user: UserSmallModel;
  stayId: string;
  stay: StaySmallModel;
}
