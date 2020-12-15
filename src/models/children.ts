import { Document, Schema, model, Model } from "mongoose";
import { IDate, dateSchema } from "./commons";

export interface IChild {
  _id: string;
  lastName: string;
  firstName: string;
  birthDate: IDate;
  note: string;
}

export const childSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  birthDate: dateSchema,
  note: { type: String, required: true},
});
