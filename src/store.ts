import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/reducer";
import parentReducer from "./Parent/reducer";

export const store = configureStore({
  reducer: { auth: authReducer, parent: parentReducer },
});

export type RootState = ReturnType<typeof store.getState>;
