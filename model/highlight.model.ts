import { ObjectId } from "mongodb";
import {  SvgsNameTypes } from "./icons.model";

export interface HighlightModel {
  _id?: string | ObjectId;
  title: string;
  description: string;
  icon: SvgsNameTypes;
}
