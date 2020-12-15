import { Document, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IChild, childSchema } from "./children";
import { adressSchema, IAddress } from "./commons";

export interface IParent extends Document {
  email: string;
  lastName: string;
  firstName: string;
  address: IAddress;
  children: Array<IChild>;
  getSafeParent(): ISafeParent;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}

export type ISafeParent = Pick<
  IParent,
  "_id" | "email" | "lastName" | "firstName" | "address" | "children"
>;

const parentSchema = new Schema({
  email: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
  address: adressSchema,
  children: [childSchema],
});

parentSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(password, salt);
};

parentSchema.methods.validatePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(this.password, password);
};

parentSchema.methods.getSafeParent = function (): ISafeParent {
  const { _id, email, lastName, firstName, address, children } = this;
  return { _id, email, lastName, firstName, address, children };
};

export const Parent = model<IParent, Model<IParent>>("Parent", parentSchema);
