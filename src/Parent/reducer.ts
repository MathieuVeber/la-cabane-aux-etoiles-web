import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Parent } from "./types";

export const initialState = {
  currentParent: undefined,
};

export const currentParentSelector = (state: RootState): Parent | undefined =>
  state.parent.currentParent;

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setCurrentParent: (state, action) => {
      state.currentParent = action.payload.parent;
    },
    resetCurrentParent: (state) => {
      state.currentParent = undefined;
    },
  },
});

export const { setCurrentParent, resetCurrentParent } = parentSlice.actions;

const parentReducer = parentSlice.reducer;
export default parentReducer;
