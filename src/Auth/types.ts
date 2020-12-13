import { GENERAL_ERROR } from "../utils/error";

export interface AuthState {
  loading: boolean;
  success?: boolean;
  error?: string;
}

// TODO-TF Use General Error
export enum AUTH_ERROR {
  ALREADY_LOGGED_IN = "ALREADY_LOGGED_IN",
  CREDENTIALS_ERROR = "CREDENTIALS_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
}
