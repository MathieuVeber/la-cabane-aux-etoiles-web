import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import auth from "../api/auth";
import { Parent } from "../Parent/types";
import { AUTH_ERROR } from "./types";
import { setCurrentParent } from "../Parent/reducer";
import { RootState } from "../store";

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
