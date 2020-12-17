import { createAsyncThunk } from "@reduxjs/toolkit";
import { Parent } from "../Parent/types";
import { AUTH_ERROR } from "./types";
import { setCurrentParent } from "../Parent/reducer";
import { RootState } from "../store";
import * as auth from "../api/auth";

export const login = createAsyncThunk<
  { parent: Parent },
  { email: string; password: string },
  { rejectValue: AUTH_ERROR }
>("parent/login", async ({ email, password }, thunkApi) => {
  if ((thunkApi.getState() as RootState).parent.currentParent) {
    return thunkApi.rejectWithValue(AUTH_ERROR.ALREADY_LOGGED_IN);
  }
  let parent: Parent;
  try {
    parent = await auth.login(email, password);
  } catch (err) {
    if (err.response.status === 401) {
      return thunkApi.rejectWithValue(AUTH_ERROR.CREDENTIALS_ERROR);
    } else {
      return thunkApi.rejectWithValue(AUTH_ERROR.SERVER_ERROR);
    }
  }

  thunkApi.dispatch(setCurrentParent(parent));
  return { parent };
});

export const register = createAsyncThunk<
  { parent: Parent },
  {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    street: string;
    complement: string;
    zipCode: string;
    city: string;
  },
  { rejectValue: AUTH_ERROR }
>(
  "parent/register",
  async (
    { email, password, firstName, lastName, street, complement, city, zipCode },
    thunkApi
  ) => {
    if ((thunkApi.getState() as RootState).parent.currentParent) {
      return thunkApi.rejectWithValue(AUTH_ERROR.ALREADY_LOGGED_IN);
    }
    let parent: Parent;
    try {
      parent = await auth.register(
        email,
        password,
        firstName,
        lastName,
        street,
        complement,
        zipCode,
        city
      );
    } catch (err) {
      if (err.response.status === 400) {
        return thunkApi.rejectWithValue(AUTH_ERROR.EMAIL_ALREADY_EXISTS);
      } else {
        return thunkApi.rejectWithValue(AUTH_ERROR.SERVER_ERROR);
      }
    }

    thunkApi.dispatch(setCurrentParent(parent));
    return { parent };
  }
);

export const fetchConnectedParent = createAsyncThunk<
  void,
  void,
  { rejectValue: AUTH_ERROR }
>("parent/fetchConnectedParent", async (_, thunkApi) => {
  const state = thunkApi.getState() as RootState;
  if (state.parent.currentParent) {
    return;
  }
  let parent: Parent;
  try {
    parent = await auth.fetchConnectedParent();
  } catch (err) {
    // Here we should ignore any other error from the server as it is normal not
    // to be connected at this stage
    if (err.response.status === 500) {
      return thunkApi.rejectWithValue(AUTH_ERROR.SERVER_ERROR);
    } else {
      return;
    }
  }
  thunkApi.dispatch(setCurrentParent(parent));
});
