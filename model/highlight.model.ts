import { ObjectId } from "mongodb";
import { SvgsNameTypes } from "./icons.model";

export interface HighlightModel {
  _id?: string;
  title: string;
  description: string;
  icon: SvgsNameTypes;
}

export interface HighlightSchema {
  _id: ObjectId;
  stayId: ObjectId;
  title: string;
  description: string;
  icon: SvgsNameTypes;
}
