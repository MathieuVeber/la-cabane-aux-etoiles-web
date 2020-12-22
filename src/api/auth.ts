import api from ".";
import { Parent } from "../Parent/types";

export const login = async (
  email: string,
  password: string
): Promise<Parent> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  street: string,
  complement: string,
  zipCode: string,
  city: string
): Promise<Parent> => {
  const res = await api.post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
    address: {
      street,
      complement,
      zipCode,
      city,
    },
  });
  return res.data;
};

export const fetchConnectedParent = async (): Promise<Parent> => {
  const res = await api.get("/me");
  return res.data;
};
