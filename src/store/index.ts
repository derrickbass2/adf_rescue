import { configureStore } from "@reduxjs/toolkit";

export type AppDispatch = typeof store["dispatch"];
export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});