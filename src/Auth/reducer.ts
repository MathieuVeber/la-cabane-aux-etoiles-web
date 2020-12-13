import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { login } from "./actions";
import { AuthState, AUTH_ERROR } from "./types";

export const initialState: AuthState = {
  loading: false,
  success: undefined,
  error: undefined,
};

export const authSelector = (state: RootState) => state.auth;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.success = undefined;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
