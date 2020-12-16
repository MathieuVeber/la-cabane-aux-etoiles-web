import { Document, Schema, model, Model } from "mongoose";

//-------------------- DATE --------------------//

export interface IDate {
  day: number;
  month: number;
  year: number;
}

export const dateSchema = new Schema({
  day: { type: Number, required: true, min: 1, max: 31 },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
});

//-------------------- ADDRESS --------------------//

export interface IAddress {
  number: number;
  street: string;
  complement?: string;
  city: string;
  zipCode: number;
  country: string;
}

export const adressSchema = new Schema({
  number: { type: Number, required: true },
  street: { type: String, required: true },
  complement: { type: String, required: false },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
  country: { type: String, required: true, default: "France" },
});
