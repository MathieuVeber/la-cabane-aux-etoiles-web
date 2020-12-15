import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currentParent: undefined,
};

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setCurrentParent: (state, action) => {
      state.currentParent = action.payload.parent;
    },
  },
});

export const { setCurrentParent } = parentSlice.actions;

const parentReducer = parentSlice.reducer;
export default parentReducer;
