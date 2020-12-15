import api from ".";
import { Parent } from "../Parent/types";

const login = async (email: string, password: string): Promise<Parent> => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const teapot = async (): Promise<Parent> => {
  const res = await api.get("/teapot");
  return res.data;
};

export default { login, teapot };
